import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Role, Permission, Resources, Actions } from './role.model';
import { RoleService }              from './role.service';

@Component({
	selector: 'tg-role-form',
	templateUrl: './role-form.component.html'
})
export class RoleFormComponent {
	private roleOrig: Role;
	private roleCopy: Role;

	private resources = Resources;
	private actions   = Actions;

	private permissions = {};

	@Input()
	public set role(role: Role) {
		this.roleOrig = role;
		this.roleCopy = JSON.parse(JSON.stringify(role));

		for (let resource of Resources) {
			let permSet = {};

			for (let action of Actions) {
				permSet[action] = {
					grant: false,
					override: false
				};
			}

			this.permissions[resource] = permSet;
		}

		if (role.permissions != undefined) {
			for (let perm of role.permissions) {
				if (this.permissions[perm.resource] && this.permissions[perm.resource][perm.action]) {
					this.permissions[perm.resource][perm.action].grant = true;
					this.permissions[perm.resource][perm.action].override = perm.override;
				}
			}
		}
	}

	@Output()
	public save = new EventEmitter<Role>();

	@Output()
	public delete = new EventEmitter<Role>();

	@Output()
	public cancel = new EventEmitter<any>();

	constructor(private roleService: RoleService) {}

	private doSave() {
		this.roleCopy.permissions = [];

		for (let resource of Resources) {
			for (let action of Actions) {
				if (this.permissions[resource][action].grant) {
					this.roleCopy.permissions.push({
						action: action,
						resource: resource,
						override: this.permissions[resource][action].override
					});
				}
			}
		}

		this.roleService.save(this.roleCopy)
		.then(this.onSave.bind(this));
	}

	private onSave(role: Role) {
		this.role = role;
		this.save.emit(role);
	}

	private doDelete() {
		if (confirm('Are you sure you want to delete this issue?')) {
			this.roleService.delete(this.roleCopy)
			.then(this.onDelete.bind(this));
		}
	}

	private onDelete(role: Role) {
		this.role = role;
		this.delete.emit(role);
	}

	private doCancel() {
		this.role = this.roleOrig;
		this.cancel.emit(null);
	}
}
