import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { User } from './user.model';
export { User } from './user.model';

import { UserListComponent } from './user-list.component';
export { UserListComponent } from './user-list.component';

import { UserFormComponent } from './user-form.component';
export { UserFormComponent } from './user-form.component';

import { UserService } from './user.service';
export { UserService } from './user.service';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],
	exports: [
		UserListComponent,
		UserFormComponent
	],
	declarations: [
		UserListComponent,
		UserFormComponent
	],
	providers: [
		UserService
	]
})
export class UserModule {}
