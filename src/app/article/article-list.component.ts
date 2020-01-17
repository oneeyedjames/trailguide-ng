import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PublicContentModel } from  '../content.module';

import { Article }        from './article.model';
import { ArticleService } from './article.service';

@Component({
	selector: 'tg-article-list',
	templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
	private newArticle: Article;
	private showForm: boolean;

	@Input()
	chapter: PublicContentModel; // Chapter;

	articles: Article[];

	constructor(
		private articleService: ArticleService,
		private router: Router
	) {}

	ngOnInit() {
		this.articleService.getChildren('chapter', this.chapter)
		.then((articles: Article[]) => this.articles = articles);
	}

	onSave(article: Article) {
		this.articles.push(article);
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		if (this.showForm = showForm) {
			this.newArticle = new Article();
			this.newArticle.chapter = this.chapter._id;
		}
	}

	goToDetail(article: Article) {
		this.router.navigate(['article', article._id]);
	}
}
