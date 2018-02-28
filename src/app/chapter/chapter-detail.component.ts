import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Issue }        from '../issue/issue.model';
import { IssueService } from '../issue/issue.service';

import { Chapter }		  from './chapter.model';
import { ChapterService } from './chapter.service';

@Component({
	selector: 'tg-chapter-detail',
	templateUrl: './chapter-detail.component.html'
})
export class ChapterDetailComponent {
	private sub: Subscription;

	issue: Issue;
	chapter: Chapter;

	showForm: boolean;

	constructor (
		private issueService: IssueService,
		private chapterService: ChapterService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			this.chapterService.getOne(params['id'])
			.then((chapter: Chapter) => {
				this.chapter = chapter;
				return this.issueService.getOne(chapter.issue);
			}).then((issue: Issue) => {
				this.issue = issue;
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	goToList() {
		this.router.navigate([ '/issue', this.issue._id ]);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

        this.showForm = showForm;
    }

	onSave(chapter: Chapter) {
		this.chapter = chapter;
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}
}
