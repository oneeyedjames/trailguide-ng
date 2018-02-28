import { Component, Output, EventEmitter } from '@angular/core';

import { LoginService, User } from './login.service';

@Component({
	selector: 'tg-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private username: string;
	private password: string;

	private register: boolean;

	@Output()
	login = new EventEmitter<User>();

	constructor(private loginService: LoginService) {}

	private doLogin() {
		this.loginService.login(this.username, this.password)
		.then((isSuccess: boolean) => this.loginService.getUser())
		.then((user: User) => this.login.emit(user))
		.catch((error: any) => console.error(error));
	}

	private doRegister() {
		this.loginService.register(this.username, this.password)
		.then((isSuccess: boolean) => this.loginService.getUser())
		.then((user: User) => this.login.emit(user))
		.catch((error: any) => console.error(error));
	}

	private toggleRegister() {
		this.register = !this.register;
	}
}
