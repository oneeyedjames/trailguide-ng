import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Role } from '../role/role.model';

export interface User {
	username: string;
	roles?: Role[];
}

@Injectable()
export class LoginService {
    protected headers = new Headers({ 'Content-Type': 'application/json' });

	protected getOptions = { withCredentials: true };
	protected postOptions = { withCredentials: true, headers: this.headers };

	private hostName: string = 'localhost:3000';

	constructor(protected http: Http) {}

	public login(username: string, password: string): Promise<boolean> {
		const url = this.getUrl('login');
		let data = JSON.stringify({
			username: username,
			password: password
		});

		return this.http.post(url, data, this.postOptions)
		.toPromise().then((response: Response) => response.ok)
		.catch((error: any) => Promise.reject(error.message || error));
	}

	public logout(): Promise<boolean> {
		const url = this.getUrl('logout');

		return this.http.post(url, '{}', this.postOptions)
		.toPromise().then((response: Response) => response.ok)
		.catch((error: any) => Promise.reject(error.message || error));
	}

    public register(username: string, password: string): Promise<boolean> {
        const url = this.getUrl('register');
		let data = JSON.stringify({
			username: username,
			password: password
		});

		return this.http.post(url, data, this.postOptions)
		.toPromise().then((response: Response) => response.ok)
		.catch((error: any) => Promise.reject(error.message || error));
    }

	public getUser(): Promise<User> {
		const url = this.getUrl('user/me');

		return this.http.get(url, this.getOptions).toPromise()
		.then((response: Response) => response.json() as User)
		.catch((error: any) => Promise.reject(error.message || error));
	}

	protected getUrl(path: string): string {
		return `http://${this.hostName}/api/${path}`;
	}
}
