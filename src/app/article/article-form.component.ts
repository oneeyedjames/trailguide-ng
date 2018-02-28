import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Chapter } from '../chapter/chapter.model';

import { Article }        from './article.model';
import { ArticleService } from './article.service';

@Component({
    selector: 'tg-article-form',
    templateUrl: './article-form.component.html'
})
export class ArticleFormComponent {
	private articleBind: Article;
	private articleCopy: Article;

	@Input()
    set article(article: Article) {
		this.articleBind = article;
		this.articleCopy = JSON.parse(JSON.stringify(article));
	}

	@Output()
	save = new EventEmitter<Article>();

	@Output()
	delete = new EventEmitter<Article>();

	@Output()
	cancel = new EventEmitter<any>();

	constructor (
        private articleService: ArticleService,
         private router: Router
    ) {}

	doSave() {
		this.articleCopy.publishedAt = new Date(this.articleCopy.publishedAt);
		this.articleService.save(this.articleCopy)
		.then(this.onSave.bind(this));
	}

	onSave(article: Article) {
		this.article = article;
		this.save.emit(article);
	}

	doDelete() {
		if (confirm('Are you sure you want to delete this article?')) {
			this.articleService.delete(this.articleCopy)
			.then(this.onDelete.bind(this));
		}
	}

	onDelete(article: Article) {
		this.article = article;
		this.delete.emit(article);
	}

	doCancel() {
		this.cancel.emit(null);
	}
}
