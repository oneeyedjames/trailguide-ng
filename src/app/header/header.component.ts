import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ScreenService } from '../screen.module';

import { HeaderMenuService, HeaderMenu, Link } from './header.service';

export type HeaderButtonType = 'menu' | 'back';

@Component({
	selector: 'tg-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent {
	@Input()
	buttonType: HeaderButtonType;

	@Input()
	title: string;

	@Input()
	menuLinks: Link[] = [];

	@Output('toggle')
	toggleEvent = new EventEmitter<any>();

	@Output('goBack')
	goBackEvent = new EventEmitter<any>();

	get actionItems(): Link[] {
		if (this.menuLinks.length > this.maxLength) {
			return this.menuLinks.slice(0, this.maxLength - 1);
		} else {
			return this.menuLinks;
		}
	}

	get menuItems(): Link[] {
		if (this.menuLinks.length > this.maxLength) {
			return this.menuLinks.slice(this.maxLength - 1);
		} else {
			return [];
		}
	}

	get maxLength(): number {
		if (this.screenService.isLarge)
			return 6;
		else if (this.screenService.isMedium)
			return 5;
		else if (this.screenService.isSmall)
			return 4;
		else
			return 3;
	}

	constructor(
		private screenService: ScreenService,
		private menuService: HeaderMenuService
	) {
		menuService.subscribe((menu: HeaderMenu) => {
			this.menuLinks = menu.links;
		});
	}

	private doMenuAction(link: Link, event?: MouseEvent) {
		event.preventDefault();
		this.menuService.doAction(link);
	}
}
