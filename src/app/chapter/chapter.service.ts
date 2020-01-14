import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { ModelService } from '../../lib/model.module';

import { Chapter } from './chapter.model';

@Injectable()
export class ChapterService extends ModelService<Chapter> {
	constructor(protected http: Http) {
		super(http, 'chapters', 'chapter');

		// this.registerRelated('issue');
	}
}
