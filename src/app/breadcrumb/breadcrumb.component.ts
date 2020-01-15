import { Component, Input } from '@angular/core';

import { Link, LinkService } from '../../lib/link.module';

import { Breadcrumb, BreadcrumbService } from './breadcrumb.service';

@Component({
	selector: 'tg-breadcrumb',
	templateUrl: 'breadcrumb.component.html',
	styleUrls: ['breadcrumb.component.scss'],
	inputs: ['links']
})
export class BreadcrumbComponent {
	@Input()
	links: Link[] = [];

	constructor(
		private breadcrumbService: BreadcrumbService,
		private linkService: LinkService
	) {
		this.breadcrumbService.subscribe((data: Breadcrumb) => {
			this.links = data.links;
		});
	}

	private onClick(link: Link, event?: MouseEvent) {
		event.preventDefault();
		this.linkService.doAction(link);
	}
}
