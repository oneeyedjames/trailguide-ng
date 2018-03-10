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

import { Reply }        from './reply.model';
import { ReplyService } from './reply.service';

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
	_reply: Reply;

	get reply(): Reply {
		return this._reply;
	}

	set reply(reply: Reply) {
		this._reply = reply;

		this.answerList = [
			reply.observation,
			reply.interpretation,
			reply.application,
			reply.implementation
		];
	}

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

	answerList = [];

	constructor (
		private issueService: IssueService,
		private chapterService: ChapterService,
		private articleService: ArticleService,
		private replyService: ReplyService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			this.articleService.getOne(params['id'])
			.then((article: Article) => {
				this.article = article;

				this.replyService.getChild<Article>('article', article)
				.then((reply: Reply) => this.reply = reply)
				.catch((err: Error) => this.reply = new Reply());

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

	onSaveReply() {
		this._reply.article = this.article._id;
		this._reply.observation = this.answerList[0];
		this._reply.interpretation = this.answerList[1];
		this._reply.application = this.answerList[2];
		this._reply.implementation = this.answerList[3];

		this.replyService.save(this.reply)
		.then((reply: Reply) => console.log(this.reply = reply));
	}
}
