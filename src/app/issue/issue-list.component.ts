import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Issue }        from './issue.model';
import { IssueService } from './issue.service';

@Component({
    selector: 'tg-issue-list',
    templateUrl: './issue-list.component.html'
})
export class IssueListComponent implements OnInit {
    issues: Issue[];

    newIssue: Issue;
    showForm: boolean;

    constructor(
        private issueService: IssueService,
        private router: Router
    ) {}

    ngOnInit() {
        this.issueService.getAll().then(issues => this.issues = issues);
    }

    goToDetail(event: MouseEvent, issue: Issue) {
		event.preventDefault();
        this.router.navigate([ '/issue', issue._id ]);
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
}
