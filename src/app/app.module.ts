import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppComponent }    from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { LoginService }   from './login.service';
import { LoginComponent } from './login.component';

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

const AppRoutesModule = RouterModule.forRoot([
    { path: '', redirectTo: '/issues', pathMatch: 'full' },
	{ path: 'login',       component: LoginComponent },
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
        IssueService,
        ChapterService,
		ArticleService
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
