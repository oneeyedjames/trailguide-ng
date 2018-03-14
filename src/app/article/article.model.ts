import { Model } from '../model';

import { Questions } from './questions.model';

export class Article implements Model {
	_id: string;
	chapter: string;
	title: string;
	bibleReading: string;
	extraReading: string;
	content: string;
	publishedAt: Date;
	createdAt: Date;
	modifiedAt: Date;
	questions?: Questions;
}
