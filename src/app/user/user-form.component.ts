import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { User }        from './user.model';
import { UserService } from './user.service';

import { Role }        from '../role/role.model';
import { RoleService } from '../role/role.service';

@Component({
	selector: 'tg-user-form',
	templateUrl: 'user-form.component.html'
})
export class UserFormComponent implements OnInit {
	private userOrig: User;
	private userCopy: User;

	private roles: Role[];
	private userRoles: object = {};

	@Input()
	public set user(user: User) {
		this.userOrig = user;
		this.userCopy = JSON.parse(JSON.stringify(user));

		for (let role of user.roles)
			this.userRoles[(role as Role)._id] = true;
	}

	@Output()
	public save = new EventEmitter<User>();

	@Output()
	public delete = new EventEmitter<User>();

	@Output()
	public cancel = new EventEmitter<any>();

	public constructor(
		private userService: UserService,
		private roleService: RoleService
	) {}

	public ngOnInit() {
		this.roleService.getAll()
		.then((roles: Role[]) => {
			this.roles = roles;

			for (let role of roles) {
				if (!this.userRoles[role._id])
					this.userRoles[role._id] = false;
			}
		});
	}

	private doSave() {
		this.userCopy.roles = [];

		for (let roleId in this.userRoles) {
			if (this.userRoles[roleId])
				this.userCopy.roles.push(roleId);
		}

		this.userService.save(this.userCopy)
		.then(this.onSave.bind(this));
	}

	private onSave(user: User) {
		this.user = user;
		this.save.emit(user);
	}

	private doDelete() {
		if (confirm('Are you sure you want to delete this user?')) {
			this.userService.delete(this.userCopy)
			.then(this.onDelete.bind(this));
		}
	}

	private onDelete(user: User) {
		this.user = user;
		this.delete.emit(user);
	}

	private doCancel() {
		this.user = this.userOrig;
		this.cancel.emit();
	}
}
