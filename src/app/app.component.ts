import { Component, OnInit } from '@angular/core';

import { LoginService, User } from './login.service';

@Component({
    selector: 'tg-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    title = 'Trail Guide';

	user: User;

	constructor(protected loginService: LoginService) {}

	ngOnInit() {
		this.loginService.getProfile()
		.then((user: User) => this.user = user)
		.catch((error: any) => console.error(error));
	}

	private onLogin(user: User) {
		this.user = user;
	}

	private onLogout() {
		this.user = null;
	}
}
