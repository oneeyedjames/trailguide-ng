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
import { FooterModule } from './footer/footer.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { LoginModule } from './login/login.module';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';

import { IssueService }   from './issue/issue.service';
import { ChapterService } from './chapter/chapter.service';
import { ArticleService } from './article/article.service';
import { ReplyService }   from './article/reply.service';

@NgModule({
	declarations: [
		AppComponent
	],
	providers: [
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
		FooterModule,
		BreadcrumbModule,
		LoginModule,
		UserModule,
		RoleModule
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
