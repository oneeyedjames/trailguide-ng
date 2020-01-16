import { NgModule } from '@angular/core';

import { FooterComponent } from './footer.component';
export { FooterComponent } from './footer.component';

@NgModule({
	declarations: [
		FooterComponent
	],
	exports: [
		FooterComponent
	]
})
export class FooterModule {}
