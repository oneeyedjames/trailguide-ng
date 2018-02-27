import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Model }        from '../model';
import { ModelService } from '../model-service';

import { Issue } from '../issue/issue.model';

import { Chapter } from './chapter.model';

@Injectable()
export class ChapterService extends ModelService<Chapter> {
    constructor(protected http: Http) {
        super(http, 'chapters', 'chapter');

        // this.registerRelated('issue');
    }
}
