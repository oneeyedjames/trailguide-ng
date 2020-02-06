import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../lib/event.module';
import { Link } from '../../lib/link.module';

import { PublicContentModel } from '../content.module';

import { Chapter }		  from './chapter.model';
import { ChapterService } from './chapter.service';

import { HeaderMenuService } from '../header/header.module';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.module';

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
		private headerMenuService: HeaderMenuService,
		private breadcrumbService: BreadcrumbService,
		private chapterService: ChapterService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.headerMenuService.emit([
			{ icon: 'edit', label: 'Edit', action: () => this.toggleForm(true) }
		]);

		this.sub = this.route.params.subscribe((params: Params) => {
			this.chapterService.getOne(params['id'])
			.then((chapter: Chapter) => {
				this.chapter = chapter;

				this.breadcrumbService.emit([
					{ label: '[Issue Title]', action: ['issue', chapter.issue] },
					{ label: this.chapter.title,
						action: ['chapter', this.chapter._id] }
				]);
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
