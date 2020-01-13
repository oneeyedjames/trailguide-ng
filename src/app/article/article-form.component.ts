import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Article }        from './article.model';
import { ArticleService } from './article.service';

import { Questions, DefaultQuestions, BlankQuestions } from './questions.model';

@Component({
	selector: 'tg-article-form',
	templateUrl: './article-form.component.html'
})
export class ArticleFormComponent {
	private articleOrig: Article;
	private articleCopy: Article;

	private questions = DefaultQuestions;
	private defaultQuestions = DefaultQuestions;

	private useDefaultQuestions = true;

	@Input()
	public set article(article: Article) {
		this.articleOrig = article;
		this.articleCopy = JSON.parse(JSON.stringify(article));

		if (this.articleCopy.questions == null)
			this.articleCopy.questions = JSON.parse(JSON.stringify(BlankQuestions));

		this.useDefaultQuestions = article.questions == null;
		this.toggleUseDefault();
	}

	@Output()
	public save = new EventEmitter<Article>();

	@Output()
	public delete = new EventEmitter<Article>();

	@Output()
	public cancel = new EventEmitter<any>();

	constructor (private articleService: ArticleService) {}

	private doSave() {
		if (this.useDefaultQuestions)
			this.articleCopy.questions = null;

		this.articleCopy.publishedAt = new Date(this.articleCopy.publishedAt);
		this.articleService.save(this.articleCopy)
		.then(this.onSave.bind(this));
	}

	private onSave(article: Article) {
		this.article = article;
		this.save.emit(article);
	}

	private doDelete() {
		if (confirm('Are you sure you want to delete this article?')) {
			this.articleService.delete(this.articleCopy)
			.then(this.onDelete.bind(this));
		}
	}

	private onDelete(article: Article) {
		this.article = article;
		this.delete.emit(article);
	}

	private doCancel() {
		this.article = this.articleOrig;
		this.cancel.emit(null);
	}

	private toggleUseDefault() {
		this.questions = this.useDefaultQuestions
			? this.defaultQuestions
			: this.articleCopy.questions;
	}
}
