import { Injectable } from '@angular/core';

import { EventService } from '../../lib/event.module';
import { Link, LinkService } from '../../lib/link.module';

export interface HeaderMenu { links: Link[]; }

@Injectable()
export class HeaderMenuService extends EventService<HeaderMenu> {
	emit(data: HeaderMenu | Link[]): void;
	emit(data: Link[]) { super.emit({ links: data }); }

	reset() { this.emit([]); }
}
