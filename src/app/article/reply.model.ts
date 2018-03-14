import { Model } from '../model';

export class Reply implements Model {
	_id: string;
	article: string;
	observation: string;
	interpretation: string;
	application: string;
	implementation: string;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
