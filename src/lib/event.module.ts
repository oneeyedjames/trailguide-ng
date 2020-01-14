import { NgModule, Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class EventService<E> {
	private emitter = new EventEmitter<E>();

	subscribe(handler: (data: E) => void) { this.emitter.subscribe(handler); }

	emit(data: E) { this.emitter.emit(data); }
}

@NgModule({
	providers: [
		EventService
	]
})
export class LinkModule {}
