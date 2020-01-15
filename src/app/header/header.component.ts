import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Link, LinkService } from '../../lib/link.module';
import { LoginService, User } from '../login/login.service';

@Component({
	selector: 'tg-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Output('toggle')
	toggleEvent = new EventEmitter<any>();

	@Input()
	menuLinks: Link[];

	@Input()
	user: User;

	@Input()
	authorize: (action: string, resource: string) => boolean;

	@Output()
	logout = new EventEmitter<any>();

	constructor(
		private linkService: LinkService,
		private loginService: LoginService,
		private router: Router
	) {}

	private doMenuAction(link: Link, event?: MouseEvent) {
		event.preventDefault();
		this.linkService.doAction(link);
	}

	private doLogout() {
		event.preventDefault();
		this.loginService.logout()
		.then((isSuccess: boolean) => this.logout.emit())
		.catch((error: any) => console.error(error));
	}
}
