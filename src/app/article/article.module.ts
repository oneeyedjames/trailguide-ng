import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import {
	MatButtonModule,
	MatIconModule,
	MatCardModule,
	MatTableModule,
	MatFormFieldModule,
	MatInputModule,
	MatCheckboxModule,
	MatTabsModule
} from '@angular/material';

import { ArticleListComponent }   from './article-list.component';
export { ArticleListComponent }   from './article-list.component';

import { ArticleFormComponent }   from './article-form.component';
export { ArticleFormComponent }   from './article-form.component';

import { ArticleDetailComponent } from './article-detail.component';
export { ArticleDetailComponent } from './article-detail.component';

import { QuestionMessagePipe } from './question.pipe';
export { QuestionMessagePipe } from './question.pipe';

import { ArticleService } from './article.service';
export { ArticleService } from './article.service';

import { ReplyService } from './reply.service';
export { ReplyService } from './reply.service';

export { Article } from './article.model';

export { Question, Questions, DefaultQuestions, BlankQuestions } from './questions.model';

export { Reply } from './reply.model';

@NgModule({
	imports: [
		HttpModule,
		FormsModule,
		BrowserModule,
		MatButtonModule,
		MatIconModule,
		MatCardModule,
		MatTableModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		MatTabsModule
	],
	exports: [
		ArticleListComponent,
		ArticleFormComponent,
		ArticleDetailComponent,
		QuestionMessagePipe
	],
	declarations: [
		ArticleListComponent,
		ArticleFormComponent,
		ArticleDetailComponent,
		QuestionMessagePipe
	],
	providers: [
		ArticleService,
		ReplyService
	]
})
export class ArticleModule {}
