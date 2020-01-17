import { PublicContentModel } from '../content.module';

export class Issue implements PublicContentModel {
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
