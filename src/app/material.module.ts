import { NgModule, Injectable, TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { Observable, Subscriber } from 'rxjs';

import {
	MatDialog,
	MatDialogConfig,
	MatSnackBar,
	MatSnackBarConfig,
	MatSnackBarDismiss,
	MatToolbarModule,
	MatButtonModule,
	MatMenuModule,
	MatIconModule,
	MatCardModule,
	MatGridListModule,
	MatFormFieldModule,
	MatInputModule
} from '@angular/material';

export const DIALOG_DEFAULTS: MatDialogConfig = {
	width: '350px'
};

export const SNACK_BAR_DEFAULTS: MatSnackBarConfig = {
	duration: 3000,
	verticalPosition: 'top'
};

@Injectable()
export class DialogConfig<D> {
	config(data?: D): MatDialogConfig<D> {
		return { ...DIALOG_DEFAULTS, data: data };
	}
}

@Injectable()
export class SnackBarConfig<D> {
	config(data?: D): MatSnackBarConfig<D> {
		return { ...SNACK_BAR_DEFAULTS, data: data };
	}
}

export class ModalContainerComponent<D> {
	constructor(
		public dialog: MatDialog,
		public dialogCfg: DialogConfig<D>,
		public snackBar: MatSnackBar,
		public snackBarCfg: SnackBarConfig<D>
	) {}

	public openModalDialog<T>(type: ComponentType<T> | TemplateRef<T>, data?: D): Observable<any> {
		return this.dialog.open(type, this.dialogCfg.config(data)).afterClosed();
	}

	public openSnackBar(message: string, action: string = 'Ok'): Observable<boolean> {
		return new Observable<boolean>((observer: Subscriber<boolean>) => {
  			const { next, error } = observer;

			this.snackBar.open(message, action, this.snackBarCfg.config())
			.afterDismissed().subscribe((dismiss: MatSnackBarDismiss) => {
				next(dismiss.dismissedByAction);
			}, error);
		});
	}
}

@NgModule({
	providers: [
		DialogConfig,
		SnackBarConfig
	],
	exports: [
		MatToolbarModule,
		MatButtonModule,
		MatMenuModule,
		MatIconModule,
		MatCardModule,
		MatGridListModule,
		MatFormFieldModule,
		MatInputModule
	]
})
export class MaterialModule {}
