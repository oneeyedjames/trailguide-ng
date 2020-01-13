import { ContentModel } from '../content.model';

export class Reply implements ContentModel {
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
