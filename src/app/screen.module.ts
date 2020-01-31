import { NgModule, Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Observable } from 'rxjs/Observable';

interface MediaQueryListEvent {
	media: string;
	matches: boolean;
}

export const SCREEN_LG = 'lg';
export const SCREEN_MD = 'md';
export const SCREEN_SM = 'sm';
export const SCREEN_XS = 'xs';

export interface ScreenEvent { size: string; }
export interface ScreenEventListener {
	(event: ScreenEvent): void;
}

@Injectable()
export class ScreenService {
	private lgMediaQuery: MediaQueryList;
	private mdMediaQuery: MediaQueryList;
	private smMediaQuery: MediaQueryList;

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

	private listeners: ScreenEventListener[] = [];

	constructor(mediaMatcher: MediaMatcher) {
		this.lgMediaQuery = mediaMatcher.matchMedia('(min-width: 1024px)');
		this.mdMediaQuery = mediaMatcher.matchMedia('(min-width: 768px)');
		this.smMediaQuery = mediaMatcher.matchMedia('(min-width: 480px)');

		let listener = this.onChange.bind(this);

		this.lgMediaQuery.addListener(listener);
		this.mdMediaQuery.addListener(listener);
		this.smMediaQuery.addListener(listener);
	}

	addListener(listener: ScreenEventListener) {
		this.listeners.push(listener);
	}

	private onChange(e: MediaQueryListEvent) {
		let screenEvent = { size: this.size };

		this.listeners.forEach(listener => listener(screenEvent));
	}
}

@NgModule({
	exports: [
		ScreenService
	]
})
export class ScreenModule {}
