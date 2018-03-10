import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Model }        from '../model';
import { ModelService } from '../model-service';

import { Reply } from './reply.model';

@Injectable()
export class ReplyService extends ModelService<Reply> {
	constructor(protected http: Http) {
		super(http, 'replies', 'reply');
	}
}
