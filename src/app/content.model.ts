import { Model } from '../lib/model';

export interface ContentModel extends Model {
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
