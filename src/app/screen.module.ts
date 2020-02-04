import { NgModule, Injectable, EventEmitter } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

interface MediaQueryListEvent {
	media: string;
	matches: boolean;
}

export const SCREEN_LG = 'lg';
export const SCREEN_MD = 'md';
export const SCREEN_SM = 'sm';
export const SCREEN_XS = 'xs';

@Injectable()
export class ScreenService {
	private lgMediaQuery: MediaQueryList;
	private mdMediaQuery: MediaQueryList;
	private smMediaQuery: MediaQueryList;

	private changeEvent = new EventEmitter<string>();

	get isLarge()  : boolean { return this.lgMediaQuery.matches; }
	get isMedium() : boolean { return this.mdMediaQuery.matches; }
	get isSmall()  : boolean { return this.smMediaQuery.matches; }
	get isXSmall() : boolean { return !this.smMediaQuery.matches; }

	get size(): string {
		if (this.isLarge)
			return SCREEN_LG;
		else if (this.isMedium)
			return SCREEN_MD;
		else if (this.isSmall)
			return SCREEN_SM;
		else
			return SCREEN_XS;
	}

	constructor(mediaMatcher: MediaMatcher) {
		this.lgMediaQuery = mediaMatcher.matchMedia('(min-width: 1024px)');
		this.mdMediaQuery = mediaMatcher.matchMedia('(min-width: 768px)');
		this.smMediaQuery = mediaMatcher.matchMedia('(min-width: 480px)');

		let listener = (e: MediaQueryListEvent) => {
			this.changeEvent.emit(this.size);
		};

		this.lgMediaQuery.addListener(listener);
		this.mdMediaQuery.addListener(listener);
		this.smMediaQuery.addListener(listener);
	}

	public onChange(handler: (size: string) => void): Subscription {
		return this.changeEvent.subscribe(handler);
	}
}

@NgModule({
	exports: [
		ScreenService
	]
})
export class ScreenModule {}
