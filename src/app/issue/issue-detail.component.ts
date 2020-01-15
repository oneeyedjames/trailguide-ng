import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../lib/event.module';
import { Link }         from '../../lib/link.module';

import { Issue }        from './issue.model';
import { IssueService } from './issue.service';

@Component({
	selector: 'tg-issue-detail',
	templateUrl: './issue-detail.component.html'
})
export class IssueDetailComponent implements OnInit, OnDestroy {
	private sub: Subscription;

	issue: Issue;

	showForm: boolean;

	constructor(
		private issueService: IssueService,
		private linkService: EventService<Link>,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.linkService.emit({ icon: 'edit', label: 'Edit',
			action: () => this.toggleForm(true) });

		this.sub = this.route.params.subscribe((params: Params) => {
			this.issueService.getOne(params.id)
			.then((issue: Issue) => this.issue = issue);
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
