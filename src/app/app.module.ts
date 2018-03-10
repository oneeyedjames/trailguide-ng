import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }    from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { LoginService }   from './login/login.service';
import { LoginComponent } from './login/login.component';

import { RoleService }       from './role/role.service';
import { RoleListComponent } from './role/role-list.component';
import { RoleFormComponent } from './role/role-form.component';

import { IssueService }         from './issue/issue.service';
import { IssueListComponent }   from './issue/issue-list.component';
import { IssueDetailComponent } from './issue/issue-detail.component';
import { IssueFormComponent }   from './issue/issue-form.component';

import { ChapterService }         from './chapter/chapter.service';
import { ChapterListComponent }   from './chapter/chapter-list.component';
import { ChapterDetailComponent } from './chapter/chapter-detail.component';
import { ChapterFormComponent }   from './chapter/chapter-form.component';

import { ArticleService }         from './article/article.service';
import { ArticleListComponent }   from './article/article-list.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { ArticleFormComponent }   from './article/article-form.component';

import { ReplyService } from './article/reply.service';

const AppRoutesModule = RouterModule.forRoot([
    { path: '', redirectTo: '/issues', pathMatch: 'full' },
	{ path: 'login',       component: LoginComponent },
	{ path: 'roles',       component: RoleListComponent },
    { path: 'issues',      component: IssueListComponent },
    { path: 'issue/:id',   component: IssueDetailComponent },
    { path: 'chapter/:id', component: ChapterDetailComponent },
    { path: 'article/:id', component: ArticleDetailComponent }
]);

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
		LoginComponent,
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
		ArticleFormComponent
    ],
    providers: [
		LoginService,
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
        AppRoutesModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
