import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Chapter }        from './chapter.model';
import { ChapterService } from './chapter.service';

@Component({
    selector: 'tg-chapter-form',
    templateUrl: './chapter-form.component.html'
})
export class ChapterFormComponent {
	private chapterOrig: Chapter;
	private chapterCopy: Chapter;

	@Input()
    set chapter(chapter: Chapter) {
		this.chapterOrig = chapter;
		this.chapterCopy = JSON.parse(JSON.stringify(chapter));
	}

	@Output()
	save = new EventEmitter<Chapter>();

	@Output()
	delete = new EventEmitter<Chapter>();

	@Output()
	cancel = new EventEmitter<any>();

	constructor (private chapterService: ChapterService) {}

	doSave() {
		this.chapterCopy.publishedAt = new Date(this.chapterCopy.publishedAt);
		this.chapterService.save(this.chapterCopy)
		.then(this.onSave.bind(this));
	}

	onSave(chapter: Chapter) {
		this.chapter = chapter;
		this.save.emit(chapter);
	}

	doDelete() {
		if (confirm('Are you sure you want to delete this chapter?')) {
			this.chapterService.delete(this.chapterCopy)
			.then(this.onDelete.bind(this));
		}
	}

	onDelete(chapter: Chapter) {
		this.chapter = chapter;
		this.delete.emit(chapter);
	}

	doCancel() {
		this.chapter = this.chapterOrig;
		this.cancel.emit(null);
	}
}
