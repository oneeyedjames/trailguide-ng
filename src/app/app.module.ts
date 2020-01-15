import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MatIconModule }    from '@angular/material';
import { MatListModule }    from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { EventService } from '../lib/event.module';

import { AppViewsModule, AppRoutesModule } from './app-views.module';
import { AppComponent }   from './app.component';

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
		LoginService,
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
		AppRoutesModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
