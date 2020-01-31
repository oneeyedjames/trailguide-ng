import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { MatIconModule }    from '@angular/material';
import { MatListModule }    from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
	declarations: [
		AppComponent
	],
	providers: [
		EventService,
		ScreenService
	],
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
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
