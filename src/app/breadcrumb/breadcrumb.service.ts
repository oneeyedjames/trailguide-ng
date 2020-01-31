import { Injectable } from '@angular/core';

import { EventService } from '../../lib/event.module';
import { Link } from '../../lib/link.module';

export interface Breadcrumb { links: Link[]; }

@Injectable()
export class BreadcrumbService extends EventService<Breadcrumb> {
	emit(data: Breadcrumb | Link[]): void;
	emit(data: Link[]) { super.emit({ links: data }); }

	reset() { this.emit([]); }
}
