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

	@Output('save')
	saveEvent = new EventEmitter<Chapter>();

	@Output('delete')
	deleteEvent = new EventEmitter<Chapter>();

	@Output('cancel')
	cancelEvent = new EventEmitter<any>();

	constructor (private chapterService: ChapterService) {}

	private save() {
		this.chapterCopy.publishedAt = new Date(this.chapterCopy.publishedAt);
		this.chapterService.save(this.chapterCopy)
		.then((chapter: Chapter) => {
			this.chapter = chapter;
			this.saveEvent.emit(chapter);
		});
	}

	private delete() {
		if (confirm('Are you sure you want to delete this chapter?')) {
			this.chapterService.delete(this.chapterCopy)
			.then((chapter: Chapter) => {
				this.chapter = chapter;
				this.deleteEvent.emit(chapter);
			});
		}
	}

	private cancel() {
		this.chapter = this.chapterOrig;
		this.cancelEvent.emit(null);
	}
}
