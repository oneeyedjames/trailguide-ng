import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatButtonModule,
	MatCardModule,
	MatInputModule,
	MatFormFieldModule
} from '@angular/material';

import { LoginComponent } from './login.component';
export { LoginComponent } from './login.component';

import { LoginService } from './login.service';
export { LoginService } from './login.service';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule
	],
	exports: [
		LoginComponent
	],
	providers: [
		LoginService
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule {}
