import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Link } from '../../lib/link.module';

import { HeaderMenuService } from '../header/header.module';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.module';

import { Issue }        from './issue.model';
import { IssueService } from './issue.service';

@Component({
	selector: 'tg-issue-detail',
	templateUrl: './issue-detail.component.html'
})
export class IssueDetailComponent implements OnInit, OnDestroy {
	private sub: Subscription;
	private showForm: boolean;

	issue: Issue;

	constructor(
		private issueService: IssueService,
		private breadcrumbService: BreadcrumbService,
		private headerMenuService: HeaderMenuService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.headerMenuService.emit([
			{ icon: 'edit', label: 'Edit', action: () => this.toggleForm(true) },
		]);

		this.sub = this.route.params.subscribe((params: Params) => {
			this.issueService.getOne(params.id)
			.then((issue: Issue) => {
				this.issue = issue;
				this.breadcrumbService.emit([
					{ label: 'Issues', action: 'issues' },
					{ label: issue.title, action: ['issue', issue._id] }
				]);
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	onSave(issue: Issue) {
		this.issue = issue;
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
		this.router.navigate(['issues']);
	}
}
