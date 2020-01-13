import { ContentModel } from '../content.model';

export class Issue implements ContentModel {
	_id: string;
	title: string;
	description: string;
	volumeNumber: number;
	issueNumber: number;
	publishedAt: Date;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
