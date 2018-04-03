import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppViewsModule, AppRoutesModule } from './app-views.module';

import { AppComponent }   from './app.component';
import { LoginService }   from './login/login.service';
import { UserService }    from './user/user.service';
import { RoleService }    from './role/role.service';
import { IssueService }   from './issue/issue.service';
import { ChapterService } from './chapter/chapter.service';
import { ArticleService } from './article/article.service';
import { ReplyService }   from './article/reply.service';

// const AppRoutesModule = RouterModule.forRoot([
// 	{ path: '', redirectTo: '/issues', pathMatch: 'full' },
// 	{ path: 'login',       component: LoginComponent },
// 	{ path: 'users',       component: UserListComponent },
// 	{ path: 'roles',       component: RoleListComponent },
// 	{ path: 'issues',      component: IssueListComponent },
// 	{ path: 'issue/:id',   component: IssueDetailComponent },
// 	{ path: 'chapter/:id', component: ChapterDetailComponent },
// 	{ path: 'article/:id', component: ArticleDetailComponent }
// ]);



@NgModule({
	declarations: [
		AppComponent
	],
	providers: [
		LoginService,
		UserService,
		RoleService,
		IssueService,
		ChapterService,
		ArticleService,
		ReplyService
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppViewsModule,
		AppRoutesModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
