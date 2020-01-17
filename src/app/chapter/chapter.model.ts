import { PublicContentModel } from '../content.module';

export class Chapter implements PublicContentModel {
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
