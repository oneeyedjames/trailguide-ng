import { Model } from '../model';

export class Issue implements Model {
	_id: string;
	title: string;
	description: string;
	volumeNumber: number;
	issueNumber: number;
	publishedAt: Date;
	createdAt: Date;
	modifiedAt: Date;
}
