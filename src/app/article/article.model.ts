import { ContentModel } from '../content.model';

import { Questions } from './questions.model';

export class Article implements ContentModel {
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
