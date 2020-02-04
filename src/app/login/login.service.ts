import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/toPromise';

import { User } from '../user/user.module';
import { Role } from '../role/role.module';

@Injectable()
export class LoginService {
	protected headers = new Headers({ 'Content-Type': 'application/json' });

	protected getOptions = { withCredentials: true };
	protected postOptions = { withCredentials: true, headers: this.headers };

	private hostName: string = 'localhost:3000';

	private user: User;

	private loginEvent = new EventEmitter<User>();
	private logoutEvent = new EventEmitter<any>();

	get isLoggedIn(): boolean { return this.user != null; }

	constructor(protected http: Http) {}

	public init() {
		this.getUser();
	}

	public login(username: string, password: string): Promise<User> {
		const url = this.getUrl('login');
		let data = JSON.stringify({
			username: username,
			password: password
		});

		return this.http.post(url, data, this.postOptions)
		.toPromise().then((response: Response) => {
			if (response.ok)
				return this.getUser();
			else
				throw response.json() as Error;
		}).then((user: User) => {
			this.loginEvent.emit(user);
			return user;
		}).catch((error: any) => {
			this.loginEvent.error(error.message || error);
			return Promise.reject(error.message || error);
		});
	}

	public logout(): Promise<boolean> {
		const url = this.getUrl('logout');

		return this.http.post(url, '{}', this.postOptions)
		.toPromise().then((response: Response) => {
			if (!response.ok)
				throw response.json() as Error;

			this.user = null;
			this.logoutEvent.emit();

			return response.ok;
		}).catch((error: any) => {
			this.logoutEvent.error(error.message || error);
			return Promise.reject(error.message || error);
		});
	}

	public register(username: string, password: string): Promise<User> {
		const url = this.getUrl('register');
		let data = JSON.stringify({
			username: username,
			password: password
		});

		return this.http.post(url, data, this.postOptions)
		.toPromise().then((response: Response) => {
			if (response.ok)
				return this.getUser();
			else
				throw response.json() as Error;
		}).then((user:User) => {
			this.loginEvent.emit(user);
			return user;
		}).catch((error: any) => {
			this.loginEvent.error(error.message || error);
			return Promise.reject(error.message || error);
		});
	}

	protected getUser(): Promise<User> {
		const url = this.getUrl('user/me');

		return this.http.get(url, this.getOptions).toPromise()
		.then((response: Response) => this.user = response.json() as User);
	}

	protected getUrl(path: string): string {
		return `http://${this.hostName}/api/${path}`;
	}

	public onLogin(
		next?: (user: User) => void,
		error?: (error: any) => void,
		complete?: () => void
	): Subscription {
		return this.loginEvent.subscribe(next, error, complete);
	}

	public onLogout(
		next?: () => void,
		error?: (error: any) => void,
		complete?: () => void
	): Subscription {
		return this.logoutEvent.subscribe(next, error, complete);
	}

	public hasPermission(action: string, resource: string): boolean {
		if (this.user == undefined)
			return false;
		else if (this.user.admin)
			return true;
		else if (this.user.roles == undefined)
			return false;

		for (let role of this.user.roles) {
			if (typeof role !== 'string') {
				for (let perm of role.permissions) {
					if (perm.action == action && perm.resource == resource)
						return true;
				}
			}
		}

		return false;
	}
}
