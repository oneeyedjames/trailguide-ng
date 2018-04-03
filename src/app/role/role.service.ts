import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { ModelService } from '../../lib/model-service';

import { Role } from './role.model';

@Injectable()
export class RoleService extends ModelService<Role> {
	constructor(protected http: Http) {
		super(http, 'roles', 'role');
	}
}
