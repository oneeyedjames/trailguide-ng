import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule, MatToolbarModule } from '@angular/material';

import { FooterComponent } from './footer.component';
export { FooterComponent } from './footer.component';

@NgModule({
	declarations: [
		FooterComponent
	],
	exports: [
		FooterComponent
	],
	imports: [
		BrowserModule,
		MatIconModule,
		MatToolbarModule
	]
})
export class FooterModule {}
