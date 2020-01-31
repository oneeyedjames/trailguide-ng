import { Injectable } from '@angular/core';

import { EventService } from '../../lib/event.module';
import { Link, LinkService } from '../../lib/link.module';
export { Link } from '../../lib/link.module';

export interface HeaderMenu { links: Link[]; }

@Injectable()
export class HeaderMenuService extends EventService<HeaderMenu> {
	constructor(private linkService: LinkService) { super(); }

	emit(data: HeaderMenu | Link[]): void;
	emit(data: Link[]) { super.emit({ links: data }); }

	reset() { this.emit([]); }

	doAction(link: Link) {
		this.linkService.doAction(link);
	}
}
