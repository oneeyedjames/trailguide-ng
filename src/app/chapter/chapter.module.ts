import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {
	MatButtonModule,
	MatIconModule,
	MatTableModule,
	MatFormFieldModule,
	MatInputModule
} from '@angular/material';

import { LinkModule } from '../../lib/link.module';
import { ArticleModule } from '../article/article.module';

import { ChapterListComponent } from './chapter-list.component';
export { ChapterListComponent } from './chapter-list.component';

import { ChapterFormComponent } from './chapter-form.component';
export { ChapterFormComponent } from './chapter-form.component';

import { ChapterDetailComponent } from './chapter-detail.component';
export { ChapterDetailComponent } from './chapter-detail.component';

import { ChapterService } from './chapter.service';
export { ChapterService } from './chapter.service';

export { Chapter } from './chapter.model';

@NgModule({
	imports: [
		HttpModule,
		FormsModule,
		BrowserModule,
		MatButtonModule,
		MatIconModule,
		MatTableModule,
		MatFormFieldModule,
		MatInputModule,
		LinkModule,
		ArticleModule
	],
	exports: [
		ChapterListComponent,
		ChapterFormComponent,
		ChapterDetailComponent
	],
	declarations: [
		ChapterListComponent,
		ChapterFormComponent,
		ChapterDetailComponent
	],
	providers: [
		ChapterService
	]
})
export class ChapterModule {}
