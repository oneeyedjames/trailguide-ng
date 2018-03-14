import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Model }        from '../model';
import { ModelService } from '../model-service';

import { Article } from './article.model';

@Injectable()
export class ArticleService extends ModelService<Article> {
	constructor(protected http: Http) {
		super(http, 'articles', 'article');
	}
}
