import { RouterModule }  from '@angular/router';

import { LoginComponent } from './login/login.module';

import { UserListComponent } from './user/user.module';
import { RoleListComponent } from './role/role.module';

import { IssueListComponent, IssueDetailComponent } from './issue/issue.module';
import { ChapterDetailComponent } from './chapter/chapter.module';
import { ArticleDetailComponent } from './article/article.module';

export const RoutesModule = RouterModule.forRoot([
	{ path: '', redirectTo: '/issues', pathMatch: 'full' },
	{ path: 'login',       component: LoginComponent },
	{ path: 'users',       component: UserListComponent },
	{ path: 'roles',       component: RoleListComponent },
	{ path: 'issues',      component: IssueListComponent },
	{ path: 'issue/:id',   component: IssueDetailComponent },
	{ path: 'chapter/:id', component: ChapterDetailComponent },
	{ path: 'article/:id', component: ArticleDetailComponent }
]);
