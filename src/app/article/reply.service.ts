import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { ModelService } from '../../lib/model.module';

import { Reply } from './reply.model';

@Injectable()
export class ReplyService extends ModelService<Reply> {
	constructor(protected http: Http) {
		super(http, 'replies', 'reply');
	}
}
