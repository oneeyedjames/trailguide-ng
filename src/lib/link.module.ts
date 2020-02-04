import { NgModule, Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface LinkAction { (): void; }

export interface Link {
	label: string;
	icon?: string;
	action: string | string[] | LinkAction;
}

@Injectable()
export class LinkService {
	constructor(protected router: Router) {}

	public doAction(link: Link) {
		if (typeof link.action === 'string')
			this.router.navigate([link.action]);
		else if (link.action instanceof Array)
			this.router.navigate(link.action);
		else
			link.action();
	}
}

@NgModule({
	providers: [
		LinkService
	]
})
export class LinkModule {}
