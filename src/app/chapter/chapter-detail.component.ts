import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { PublicContentModel } from '../content.module';

import { Chapter }		  from './chapter.model';
import { ChapterService } from './chapter.service';

@Component({
	selector: 'tg-chapter-detail',
	templateUrl: './chapter-detail.component.html'
})
export class ChapterDetailComponent {
	private sub: Subscription;
	private showForm: boolean;

	issue: PublicContentModel; // Issue;
	chapter: Chapter;

	constructor (
		private chapterService: ChapterService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			this.chapterService.getOne(params['id'])
			.then((chapter: Chapter) => {
				this.chapter = chapter;
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	onSave(chapter: Chapter) {
		this.chapter = chapter;
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		this.showForm = showForm;
	}

	goToList() {
		this.router.navigate([ 'issue', this.issue._id ]);
	}
}
