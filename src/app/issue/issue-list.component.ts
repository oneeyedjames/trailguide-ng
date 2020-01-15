import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Breadcrumb, BreadcrumbService } from '../breadcrumb/breadcrumb.module';

import { Issue } from './issue.model';
import { IssueService } from './issue.service';

@Component({
	selector: 'tg-issue-list',
	templateUrl: './issue-list.component.html'
})
export class IssueListComponent implements OnInit {
	issues: Issue[];

	newIssue: Issue = new Issue();
	showForm: boolean;

	constructor(
		private issueService: IssueService,
		private breadcrumbService: BreadcrumbService,
		private router: Router
	) {}

	ngOnInit() {
		this.issueService.getAll()
		.then((issues: Issue[]) => this.issues = issues);

		this.breadcrumbService.emit([
			{ label: 'Issues', action: 'issues' }
		]);
	}

	onSave(issue: Issue) {
		this.issues.push(issue);
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		if (this.showForm = showForm)
			this.newIssue = new Issue();
	}

	goToDetail(issue: Issue) {
		this.router.navigate(['issue', issue._id]);
	}
}
