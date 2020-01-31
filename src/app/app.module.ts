import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {
	MatIconModule,
	MatListModule,
	MatSidenavModule,
	MatToolbarModule,
	MatTooltipModule
} from '@angular/material';

import { EventService } from '../lib/event.module';
import { ScreenService } from './screen.module';

import { RoutesModule } from './routes.module';
import { AppComponent }   from './app.component';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { LoginModule } from './login/login.module';

import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { IssueModule } from './issue/issue.module';
import { ChapterModule } from './chapter/chapter.module';
import { ArticleModule } from './article/article.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,

		MatIconModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,
		MatTooltipModule,

		RoutesModule,
		HeaderModule,
		FooterModule,
		BreadcrumbModule,
		LoginModule,

		UserModule,
		RoleModule,
		IssueModule,
		ChapterModule,
		ArticleModule
	],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	],
	providers: [
		EventService,
		ScreenService
	]
})
export class AppModule {}
