import { Component, ElementRef, Renderer, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, User } from './login/login.service';

@Component({
	selector: 'tg-app',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
	title = 'Trail Guide';

	user: User;

	constructor(
		private loginService: LoginService,
		private router: Router,
		elementRef: ElementRef,
		renderer: Renderer
	) {
		renderer.listen(elementRef.nativeElement, 'click', (event) => {
			if (event.target.nodeName == 'A' && event.target.href) {
				this.onClick(event);
			}
		});
	}

	public ngOnInit() {
		this.loginService.getUser()
		.then((user: User) => this.user = user)
		.catch((error: any) => console.error(error));
	}

	private hasPermission(action: string, resource: string): boolean {
		if (this.user == undefined || this.user.roles == undefined)
			return false;

		for (let role of this.user.roles) {
			for (let perm of role.permissions) {
				if (perm.action == action && perm.resource == resource)
					return true;
			}
		}

		return false;
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
