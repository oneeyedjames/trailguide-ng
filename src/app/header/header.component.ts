import { Component, Input, Output, EventEmitter } from '@angular/core';

import { LoginService, User } from '../login.service';

@Component({
    selector: 'tg-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Input()
	user: User;

	@Output()
	logout = new EventEmitter<any>();

	constructor(private loginService: LoginService) {}

	private doLogout() {
		this.loginService.logout()
		.then((isSuccess: boolean) => this.logout.emit())
		.catch((error: any) => console.error(error));
	}
}
