import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, User } from '../login/login.service';

@Component({
	selector: 'tg-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Input()
	user: User;

	@Input()
	authorize: (action: string, resource: string) => boolean;

	@Output()
	logout = new EventEmitter<any>();

	constructor(private loginService: LoginService, private router: Router) {}

	private doLogout() {
		event.preventDefault();
		this.loginService.logout()
		.then((isSuccess: boolean) => this.logout.emit())
		.catch((error: any) => console.error(error));
	}
}
