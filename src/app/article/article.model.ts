import { PublicContentModel } from '../content.module';

import { Questions } from './questions.model';

export class Article implements PublicContentModel {
	_id: string;
	chapter: string;
	title: string;
	bibleReading: string;
	extraReading: string;
	content: string;
	publishedAt: Date;
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
	questions?: Questions;
}
