import { ContentModel } from '../content.model';

export class Chapter implements ContentModel {
	_id: string;
	issue: string;
	title: string;
	description: string;
	scripture: string;
	publishedAt: Date;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
