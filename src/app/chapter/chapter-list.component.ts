import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PublicContentModel } from '../content.module';

import { Chapter }        from './chapter.model';
import { ChapterService } from './chapter.service';

@Component({
	selector: 'tg-chapter-list',
	templateUrl: './chapter-list.component.html'
})
export class ChapterListComponent implements OnInit {
	private newChapter: Chapter;
	private showForm: boolean;

	@Input()
	issue: PublicContentModel; // Issue;

	chapters: Chapter[];

	constructor(
		private chapterService: ChapterService,
		private router: Router
	) {}

	ngOnInit() {
		this.chapterService.getChildren('issue', this.issue)
		.then((chapters: Chapter[]) => this.chapters = chapters);
	}

	onSave(chapter: Chapter) {
		this.chapters.push(chapter);
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		if (this.showForm = showForm) {
			this.newChapter = new Chapter();
			this.newChapter.issue = this.issue._id;
		}
	}

	goToDetail(chapter: Chapter) {
		this.router.navigate(['chapter', chapter._id]);
	}
}
