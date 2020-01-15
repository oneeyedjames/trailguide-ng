import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MaterialModule } from './material.module';
import { LinkModule } from '../lib/link.module';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent }  from './login/login.component';

import { UserListComponent } from './user/user-list.component';
import { UserFormComponent } from './user/user-form.component';
import { RoleListComponent } from './role/role-list.component';
import { RoleFormComponent } from './role/role-form.component';

import { IssueListComponent }   from './issue/issue-list.component';
import { IssueDetailComponent } from './issue/issue-detail.component';
import { IssueFormComponent }   from './issue/issue-form.component';

import { ChapterListComponent }   from './chapter/chapter-list.component';
import { ChapterDetailComponent } from './chapter/chapter-detail.component';
import { ChapterFormComponent }   from './chapter/chapter-form.component';

import { ArticleListComponent }   from './article/article-list.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { ArticleFormComponent }   from './article/article-form.component';

import { QuestionMessagePipe } from './article/question.pipe';

export const AppRoutesModule = RouterModule.forRoot([
	{ path: '', redirectTo: '/issues', pathMatch: 'full' },
	{ path: 'login',       component: LoginComponent },
	{ path: 'users',       component: UserListComponent },
	{ path: 'roles',       component: RoleListComponent },
	{ path: 'issues',      component: IssueListComponent },
	{ path: 'issue/:id',   component: IssueDetailComponent },
	{ path: 'chapter/:id', component: ChapterDetailComponent },
	{ path: 'article/:id', component: ArticleDetailComponent }
]);

@NgModule({
	declarations: [
		HeaderComponent,
		FooterComponent,
		LoginComponent,
		UserListComponent,
		UserFormComponent,
		RoleListComponent,
		RoleFormComponent,
		IssueListComponent,
		IssueDetailComponent,
		IssueFormComponent,
		ChapterListComponent,
		ChapterDetailComponent,
		ChapterFormComponent,
		ArticleListComponent,
		ArticleDetailComponent,
		ArticleFormComponent,
		QuestionMessagePipe
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		MaterialModule,
		LinkModule
	],
	exports: [
		HeaderComponent,
		FooterComponent,
		LoginComponent,
		UserListComponent,
		UserFormComponent,
		RoleListComponent,
		RoleFormComponent,
		IssueListComponent,
		IssueDetailComponent,
		IssueFormComponent,
		ChapterListComponent,
		ChapterDetailComponent,
		ChapterFormComponent,
		ArticleListComponent,
		ArticleDetailComponent,
		QuestionMessagePipe
	]
})
export class AppViewsModule {}
