import { Component, OnInit, OnDestroy }   from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { Link } from '../../lib/link.module';

import { PublicContentModel } from '../content.module';

import { HeaderMenuService } from '../header/header.module';
import { BreadcrumbService } from '../breadcrumb/breadcrumb.module';

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
	private showForm: boolean;
	private _reply: Reply;

	chapter: PublicContentModel; // Chapter;
	article: Article;

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

	get questions(): Questions {
		return this.article.questions || DefaultQuestions;
	}

	get questionList(): Question[] {
		return [
			this.questions.observation,
			this.questions.interpretation,
			this.questions.application,
			this.questions.implementation
		];
	}

	answerList = [];

	constructor (
		private articleService: ArticleService,
		private replyService: ReplyService,
		private breadcrumbService: BreadcrumbService,
		private headerMenuService: HeaderMenuService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.sub = this.route.params.subscribe((params: Params) => {
			this.articleService.getOne(params['id'])
			.then((article: Article) => {
				this.article = article;

				this.headerMenuService.emit([
					{ icon: 'edit', label: 'Edit',
						action: () => this.showForm = true }
				]);

				this.breadcrumbService.emit([
					{ label: '[Issue Title]', action: ['issue', 'id'] },
					{ label: '[Chapter Title]', action: ['chapter', article.chapter] },
					{ label: article.title, action: ['article', article._id] }
				]);

				this.replyService.getChild<Article>('article', article)
				.then((reply: Reply) => this.reply = reply)
				.catch((err: Error) => this.reply = new Reply());
			});
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
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

	toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		this.showForm = showForm;
	}

	goToList() {
		this.router.navigate([ '/chapter', this.chapter._id ]);
	}
}
