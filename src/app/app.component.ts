import { Component, ElementRef, Renderer, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { EventService } from '../lib/event.module';
import { Link, LinkService } from '../lib/link.module';

import { ScreenService } from './screen.module';

import { LoginService } from './login/login.module';
import { User } from './user/user.module';

import { HeaderMenuService, HeaderButtonType } from './header/header.module';
import { BreadcrumbService } from './breadcrumb/breadcrumb.module';

@Component({
	selector: 'tg-app',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	title = 'Trail Guide';

	sidebarOpen = false;
	sidebarLinks: Link[] = [];

	get sidebarIsOpen(): boolean {
		return this.sidebarOpen || this.screenService.isLarge;
	}

	set sidebarIsOpen(open: boolean) {
		if (!this.screenService.isLarge)
			this.sidebarOpen = open;
	}

	get sidebarMode(): string {
		return this.screenService.isLarge ? 'side' : 'over';
	}

	get headerButtonType(): HeaderButtonType {
		if (this.previousRoutes.length)
			return 'back';
		else if (this.screenService.isLarge)
			return null;
		else
			return 'menu';
	}

	private homeLink: Link = { icon: 'home', label: 'Home', action: '/' };
	private logoutLink: Link = { icon: 'dashboard', label: 'Logout',
		action: () => this.loginService.logout() };

	private currentRoute: string;
	private previousRoutes: string[] = [];
	private topLevelRoutes = ['/issues'];

	user: User;

	constructor(
		private headerMenuService: HeaderMenuService,
		private breadcrumbService: BreadcrumbService,
		private loginService: LoginService,
		private screenService: ScreenService,
		private linkService: LinkService,
		private router: Router,
		elementRef: ElementRef,
		renderer: Renderer
	) {
		renderer.listen(elementRef.nativeElement, 'click', (event) => {
			if (event.target.nodeName == 'A' && event.target.href) {
				this.onClick(event);
			}
		});

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.headerMenuService.reset();
				this.breadcrumbService.reset();

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
	}

	public ngOnInit() {
		this.sidebarLinks = [this.homeLink, this.logoutLink];
		this.loginService.init();
	}

	private doLinkClick(link: Link) {
		this.sidebarIsOpen = false;
		this.linkService.doAction(link);
	}

	private onGoBack() {
		this.currentRoute = null;

		let route = this.previousRoutes.pop();
		this.router.navigate([route]);
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
