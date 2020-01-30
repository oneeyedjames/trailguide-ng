import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Link } from '../../lib/link.module';

@Component({
	selector: 'tg-footer',
	templateUrl: './footer.component.html',
	styleUrls: [ './footer.component.scss' ]
})
export class FooterComponent {
	@Input()
	links: Link[];

	@Output('linkClick')
	linkClickEvent = new EventEmitter<Link>();
}
