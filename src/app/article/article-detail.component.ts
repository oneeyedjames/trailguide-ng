import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Issue }        from '../issue/issue.model';
import { IssueService } from '../issue/issue.service';

import { Chapter }        from '../chapter/chapter.model';
import { ChapterService } from '../chapter/chapter.service';

import { Article }		  from './article.model';
import { ArticleService } from './article.service';

import { Question, Questions, DefaultQuestions } from './questions.model';
import { Answers } from './answers.model';

@Component({
	selector: 'tg-article-detail',
	templateUrl: './article-detail.component.html',
	styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent {
	private sub: Subscription;

	issue: Issue;
	chapter: Chapter;
	article: Article;

	defaultQuestions = DefaultQuestions;

	showForm: boolean;

	get questions(): Questions {
		return this.article.questions || DefaultQuestions;
	}

	get questionList(): Question[] {
		let questions = this.questions;

		return [
			questions.observation,
			questions.interpretation,
			questions.application,
			questions.implementation
		];
	}

	answers = new Answers();
	answerList: string[] = [];

	constructor (
		private issueService: IssueService,
		private chapterService: ChapterService,
		private articleService: ArticleService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			this.articleService.getOne(params['id'])
			.then((article: Article) => {
				this.article = article;
				return this.chapterService.getOne(article.chapter);
			}).then((chapter: Chapter) => {
				this.chapter = chapter;
				return this.issueService.getOne(chapter.issue);
			}).then((issue: Issue) => this.issue = issue);
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
		this.answers.observation = this.answerList[0];
		this.answers.interpretation = this.answerList[1];
		this.answers.application = this.answerList[2];
		this.answers.implementation = this.answerList[3];
	}
}
