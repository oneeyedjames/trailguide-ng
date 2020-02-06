import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatFormFieldModule,
	MatInputModule,
	MatTabsModule
} from '@angular/material';

import { ChapterModule } from '../chapter/chapter.module';

import { IssueListComponent } from './issue-list.component';
export { IssueListComponent } from './issue-list.component';

import { IssueFormComponent } from './issue-form.component';
export { IssueFormComponent } from './issue-form.component';

import { IssueDetailComponent } from './issue-detail.component';
export { IssueDetailComponent } from './issue-detail.component';

import { IssueService } from './issue.service';
export { IssueService } from './issue.service';

export { Issue } from './issue.model';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatTabsModule,
		ChapterModule
	],
	exports: [
		IssueListComponent,
		IssueFormComponent,
		IssueDetailComponent
	],
	declarations: [
		IssueListComponent,
		IssueFormComponent,
		IssueDetailComponent
	],
	providers: [
		IssueService
	]
})
export class IssueModule {}
