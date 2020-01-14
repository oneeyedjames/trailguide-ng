import { Model } from '../../lib/model.module';

import { Role } from '../role/role.model';

export class User implements Model {
	_id: string;
	username: string;
	roles?: (Role|string)[];
	admin: boolean;
}
