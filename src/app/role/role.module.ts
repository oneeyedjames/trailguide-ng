import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { Role } from './role.model';
export { Role } from './role.model';

import { RoleListComponent } from './role-list.component';
export { RoleListComponent } from './role-list.component';

import { RoleFormComponent } from './role-form.component';
export { RoleFormComponent } from './role-form.component';

import { RoleService } from './role.service';
export { RoleService } from './role.service';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule
	],
	exports: [
		RoleListComponent,
		RoleFormComponent
	],
	declarations: [
		RoleListComponent,
		RoleFormComponent
	],
	providers: [
		RoleService
	]
})
export class RoleModule {}
