import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Issue }		from './issue.model';
import { IssueService } from './issue.service';

@Component({
	selector: 'tg-issue-form',
	templateUrl: './issue-form.component.html'
})
export class IssueFormComponent {
	private issueOrig: Issue;
	private issueCopy: Issue;

	@Input()
	set issue(issue: Issue) {
		this.issueOrig = issue;
		this.issueCopy = JSON.parse(JSON.stringify(issue));
	}

	@Output('save')
	saveEvent = new EventEmitter<Issue>();

	@Output('delete')
	deleteEvent = new EventEmitter<Issue>();

	@Output('cancel')
	cancelEvent = new EventEmitter<any>();

	constructor(private issueService: IssueService) {}

	private doSave() {
		this.issueCopy.publishedAt = new Date(this.issueCopy.publishedAt);
		this.issueService.save(this.issueCopy)
		.then(this.onSave.bind(this));
	}

	private onSave(issue: Issue) {
		this.issue = issue;
		this.saveEvent.emit(issue);
	}

	private doDelete() {
		if (confirm('Are you sure you want to delete this issue?')) {
			this.issueService.delete(this.issueCopy)
			.then(this.onDelete.bind(this));
		}
	}

	private onDelete(issue: Issue) {
		this.issue = issue;
		this.deleteEvent.emit(issue);
	}

	private doCancel() {
		this.issue = this.issueOrig;
		this.cancelEvent.emit(null);
	}
}
