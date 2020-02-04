import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatToolbarModule,
	MatButtonModule,
	MatIconModule,
	MatMenuModule
} from '@angular/material';

import { HeaderComponent } from './header.component';
export { HeaderComponent, HeaderButtonType } from './header.component';

import { HeaderMenuService } from './header.service';
export { HeaderMenuService, HeaderMenu } from './header.service';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatButtonModule,
		MatIconModule,
		MatMenuModule
	],
	exports: [
		HeaderComponent
	],
	declarations: [
		HeaderComponent
	],
	providers: [
		HeaderMenuService
	]
})
export class HeaderModule {}
