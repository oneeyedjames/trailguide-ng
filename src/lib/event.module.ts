import { NgModule, Injectable, EventEmitter } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class EventService<E> {
	private emitter = new EventEmitter<E>();

	public subscribe(handler: (data: E) => void): Subscription {
		return this.emitter.subscribe(handler);
	}

	public emit(data: E) {
		this.emitter.emit(data);
	}
}

@NgModule({
	providers: [
		EventService
	]
})
export class EventModule {}
