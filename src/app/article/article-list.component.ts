import { Component, Input, OnInit } from '@angular/core';

import { Chapter } from '../chapter/chapter.model';

import { Article }        from './article.model';
import { ArticleService } from './article.service';

@Component({
	selector: 'tg-article-list',
	templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
	@Input()
	chapter: Chapter;

	articles: Article[];

	newArticle: Article;
	showForm: boolean;

	constructor(private articleService: ArticleService) {}

	ngOnInit() {
		this.articleService.getChildren('chapter', this.chapter)
		.then((articles: Article[]) => this.articles = articles);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		if (this.showForm = showForm) {
			this.newArticle = new Article();
			this.newArticle.chapter = this.chapter._id;
		}
	}

	onSave(article: Article) {
		this.articles.push(article);
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}
}
