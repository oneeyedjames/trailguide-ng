import { Model } from '../model';

export class Answers implements Model {
	_id: string;
	observation: string;
	interpretation: string;
	application: string;
	implementation: string;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
