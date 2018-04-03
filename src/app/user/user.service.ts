import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { ModelService } from '../../lib/model-service';

import { User } from './user.model';

@Injectable()
export class UserService extends ModelService<User> {
	constructor(protected http: Http) {
		super(http, 'users', 'user');
	}
}
