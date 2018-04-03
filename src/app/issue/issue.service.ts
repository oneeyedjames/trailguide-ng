import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { ModelService } from '../../lib/model-service';

import { Issue } from './issue.model';

@Injectable()
export class IssueService extends ModelService<Issue> {
	constructor(protected http: Http) {
		super(http, 'issues', 'issue');

		// this.registerRelated('chapter', true);
	}
}
