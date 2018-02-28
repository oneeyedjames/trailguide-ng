import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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

	constructor(private loginService: LoginService, private router: Router) {}

    private goToIssues(event: MouseEvent) {
        event.preventDefault();
        this.router.navigate([ '/issues' ]);
    }

	private doLogout() {
		this.loginService.logout()
		.then((isSuccess: boolean) => this.logout.emit())
		.catch((error: any) => console.error(error));
	}
}
