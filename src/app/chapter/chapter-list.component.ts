import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Issue } from '../issue/issue.model';

import { Chapter }        from './chapter.model';
import { ChapterService } from './chapter.service';

@Component({
    selector: 'tg-chapter-list',
    templateUrl: './chapter-list.component.html'
})
export class ChapterListComponent implements OnInit {
    @Input()
    issue: Issue;

    chapters: Chapter[];

	newChapter: Chapter;
    showForm: boolean;

    constructor(
        private chapterService: ChapterService,
        private router: Router
    ) {}

    ngOnInit() {
        this.chapterService.getChildren('issue', this.issue)
        .then((chapters: Chapter[]) => this.chapters = chapters);
    }

    goToDetail(chapter: Chapter) {
        this.router.navigate([ '/chapter', chapter._id ]);
    }

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

        if (this.showForm = showForm) {
            this.newChapter = new Chapter();
			this.newChapter.issue = this.issue._id;
		}
    }

	onSave(chapter: Chapter) {
		this.chapters.push(chapter);
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}
}
