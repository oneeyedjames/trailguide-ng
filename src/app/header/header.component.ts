import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Link, LinkService } from '../../lib/link.module';

@Component({
	selector: 'tg-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Input()
	showBackButton: boolean;

	@Input()
	title: string;

	@Input()
	menuLinks: Link[];

	@Output('toggle')
	toggleEvent = new EventEmitter<any>();

	@Output('goBack')
	goBackEvent = new EventEmitter<any>();

	constructor(private linkService: LinkService) {}

	private doMenuAction(link: Link, event?: MouseEvent) {
		event.preventDefault();
		this.linkService.doAction(link);
	}
}
