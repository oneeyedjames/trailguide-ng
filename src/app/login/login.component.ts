import { Component, Output, EventEmitter } from '@angular/core';

import { User } from '../user/user.module';

import { LoginService } from './login.service';

@Component({
	selector: 'tg-login',
	templateUrl: './login.component.html'
})
export class LoginComponent {
	private username: string;
	private password: string;

	private register: boolean;

	@Output('login')
	loginEvent = new EventEmitter<User>();

	constructor(private loginService: LoginService) {}

	private doLogin() {
		this.loginService.login(this.username, this.password)
		.then((user: User) => this.loginEvent.emit(user))
		.catch((error: any) => console.error(error));
	}

	private doRegister() {
		this.loginService.register(this.username, this.password)
		.then((user: User) => this.loginEvent.emit(user))
		.catch((error: any) => console.error(error));
	}

	private toggleRegister() {
		this.register = !this.register;
	}
}
