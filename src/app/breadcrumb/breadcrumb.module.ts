import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';

export { BreadcrumbComponent } from './breadcrumb.component';
export { BreadcrumbService, Breadcrumb } from './breadcrumb.service';

@NgModule({
	imports: [
		BrowserModule,
		MatIconModule
	],
	exports: [
		BreadcrumbComponent
	],
	declarations: [
		BreadcrumbComponent
	],
	providers: [
		BreadcrumbService
	]
})
export class BreadcrumbModule {}
