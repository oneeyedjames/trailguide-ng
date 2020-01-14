import { Model } from '../lib/model.module';

export interface ContentModel extends Model {
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
