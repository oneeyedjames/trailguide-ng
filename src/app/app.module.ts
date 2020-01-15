import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MatIconModule }    from '@angular/material';
import { MatListModule }    from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { EventService } from '../lib/event.module';

import { AppViewsModule, AppRoutesModule } from './app-views.module';
import { AppComponent }   from './app.component';

import { HeaderModule } from './header/header.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { LoginModule } from './login/login.module';

import { LoginService }   from './login/login.service';
import { UserService }    from './user/user.service';
import { RoleService }    from './role/role.service';
import { IssueService }   from './issue/issue.service';
import { ChapterService } from './chapter/chapter.service';
import { ArticleService } from './article/article.service';
import { ReplyService }   from './article/reply.service';

@NgModule({
	declarations: [
		AppComponent
	],
	providers: [
		UserService,
		RoleService,
		IssueService,
		ChapterService,
		ArticleService,
		ReplyService,
		EventService
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		MatIconModule,
		MatListModule,
		MatSidenavModule,
		AppViewsModule,
		AppRoutesModule,
		HeaderModule,
		BreadcrumbModule,
		LoginModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
