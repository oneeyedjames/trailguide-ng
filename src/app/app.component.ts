import { Component, ElementRef, ChangeDetectorRef, Renderer, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { Observable } from 'rxjs/Observable';

import { EventService } from '../lib/event.module';
import { Link, LinkService } from '../lib/link.module';

import { BreadcrumbService } from './breadcrumb/breadcrumb.module';
import { LoginService, User } from './login/login.service';

@Component({
	selector: 'tg-app',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'Trail Guide';

	private mediaQuery: MediaQueryList;
	private mediaListener: MediaQueryListListener;

	sidebarOpen = false;
	sidebarLinks: Link[] = [];
	contextLinks: Link[] = [];

	get sidebarIsOpen(): boolean {
		return this.sidebarOpen || this.mediaQuery.matches;
	}

	set sidebarIsOpen(open: boolean) {
		if (!this.mediaQuery.matches)
			this.sidebarOpen = open;
	}

	get sidebarMode(): string {
		return this.mediaQuery.matches ? 'side' : 'over';
	}

	private homeLink: Link = { icon: 'home', label: 'Home', action: '/' };
	private logoutLink: Link = { icon: 'dashboard', label: 'Logout', action: () => {} };

	private currentRoute: string;
	private previousRoutes: string[] = [];
	private topLevelRoutes = ['/issues'];

	user: User;

	constructor(
		private breadcrumbService: BreadcrumbService,
		private loginService: LoginService,
		private eventService: EventService<Link>,
		private linkService: LinkService,
		private router: Router,
		elementRef: ElementRef,
		renderer: Renderer,
		mediaMatcher: MediaMatcher,
		changeDetectorRef: ChangeDetectorRef
	) {
		this.eventService.subscribe((link: Link) => {
			this.contextLinks.push(link);
		});

		renderer.listen(elementRef.nativeElement, 'click', (event) => {
			if (event.target.nodeName == 'A' && event.target.href) {
				this.onClick(event);
			}
		});

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.contextLinks = [];
				this.breadcrumbService.emit([]);

				let route = event.urlAfterRedirects;

				if (this.topLevelRoutes.indexOf(route) >= 0) {
					this.currentRoute = null;
					this.previousRoutes = [];
				}

				if (this.currentRoute != null) {
					this.previousRoutes.push(this.currentRoute);
				}

				this.currentRoute = route;
			}
		});

		this.mediaListener = () => changeDetectorRef.detectChanges();
		this.mediaQuery = mediaMatcher.matchMedia('(min-width: 1024px)');
		this.mediaQuery.addListener(this.mediaListener);
	}

	public ngOnInit() {
		this.loginService.getUser()
		.then((user: User) => this.user = user)
		.catch((error: any) => console.error(error));

		this.sidebarLinks = [this.homeLink, this.logoutLink];
	}

	public ngOnDestroy() {
		this.mediaQuery.removeListener(this.mediaListener);
	}

	private hasPermission(action: string, resource: string): boolean {
		if (this.user == undefined)
			return false;
		else if (this.user.admin)
			return true;
		else if (this.user.roles == undefined)
			return false;

		for (let role of this.user.roles) {
			for (let perm of role.permissions) {
				if (perm.action == action && perm.resource == resource)
					return true;
			}
		}

		return false;
	}

	private doLinkClick(link: Link) {
		this.sidebarOpen = false;
		this.linkService.doAction(link);
	}

	private onGoBack() {
		this.currentRoute = null;

		let route = this.previousRoutes.pop();
		this.router.navigate([route]);
	}

	private onLogin(user: User) {
		this.user = user;
	}

	private onLogout() {
		this.user = null;
	}

	private onClick(event) {
		let href = event.target.attributes.href.value;
		if (href.match(/^([a-z]+:)?\/\//) == null) {
			event.preventDefault();

			let path = href.split('/');
			let route = [];

			for (let slug of path) {
				if (slug != '')
					route.push(slug);
			}

			if (route.length == 0)
				route.push('/');

			this.router.navigate(route);
		}
	}
}
