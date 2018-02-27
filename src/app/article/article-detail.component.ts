import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Chapter }        from '../chapter/chapter.model';
import { ChapterService } from '../chapter/chapter.service';

import { Article }		  from './article.model';
import { ArticleService } from './article.service';

enum Questions { Observation, Interpretation, Application, Implementation }

@Component({
	selector: 'tg-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent {
	private sub: Subscription;

	chapter: Chapter;
	article: Article;

	showForm: boolean;

	questions = [{
		heading: 'Say What?',
		keyword: 'Observation',
		message: 'What do I see?'
	}, {
		heading: 'So What?',
		keyword: 'Interpretation',
		message: 'What does it mean?',
	}, {
		heading: 'Now What?',
		keyword: 'Application',
		message: 'How does it apply to me?'
	}, {
		heading: 'Then What?',
		keyword: 'Implementation',
		message: 'What do I do?'
	}];

	answers = [];

	constructor (
		private chapterService: ChapterService,
		private articleService: ArticleService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			this.articleService.getOne(params['id'])
			.then((article: Article) => {
				let date = new Date(article.publishedAt);

				article.publishedAt = new Date(
					date.getUTCFullYear(),
					date.getUTCMonth(),
					date.getUTCDate()
				);

				this.article = article;

				return this.chapterService.getOne(article.chapter);
			}).then((chapter: Chapter) => {
				this.chapter = chapter;
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	goToList() {
		this.router.navigate([ '/chapter', this.chapter._id ]);
	}

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

        this.showForm = showForm;
    }

	onSave(article: Article) {
		this.article = article;
		this.toggleForm(false);
	}

	onCancel() {
		this.toggleForm(false);
	}

	onSaveAnswers() {
		console.log(this.answers);
	}
}
