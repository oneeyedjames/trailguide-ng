import { Component, Output, EventEmitter } from '@angular/core';

import { LoginService, User } from './login.service';

@Component({
	selector: 'tg-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private username: string;
	private password: string;

	@Output()
	login = new EventEmitter<User>();

	constructor(private loginService: LoginService) {}

	private doLogin() {
		this.loginService.login(this.username, this.password)
		.then((isSuccess: boolean) => {
			this.loginService.getProfile()
			.then((user: User) => this.login.emit(user))
			.catch((error: any) => console.error(error));
		})
		.catch((error: any) => console.error(error));
	}
}
