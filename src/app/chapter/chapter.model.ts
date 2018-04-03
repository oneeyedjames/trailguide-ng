import { Model } from '../../lib/model';

export class Chapter implements Model {
	_id: string;
	issue: string;
	title: string;
	description: string;
	scripture: string;
	publishedAt: Date;
	createdAt: Date;
	modifiedAt: Date;
}
