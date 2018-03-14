import { Component, OnInit } from '@angular/core';

import { Role, Resources, Actions } from './role.model';
import { RoleService }              from './role.service';

@Component({
	selector: 'tg-role-list',
	templateUrl: './role-list.component.html'
})
export class RoleListComponent implements OnInit {
	private roles: Role[];

	private newRole: Role;

	private showForm: boolean;

	private resources = Resources;
	private actions = Actions;

	constructor(private roleService: RoleService) {}

	public ngOnInit() {
		this.roleService.getAll()
		.then((roles: Role[]) => console.log(this.roles = roles));
	}

	private hasPermission(role: Role, action: string, resource: string): boolean {
		for (let perm of role.permissions) {
			if (perm.action == action && perm.resource == resource)
				return true;
		}

		return false;
	}

	private hasOverridePermission(role: Role, action: string, resource: string): boolean {
		for (let perm of role.permissions) {
			if (perm.action == action && perm.resource == resource && perm.override)
				return true;
		}

		return false;
	}

	private editRole(role: Role) {
		this.newRole = role;
		this.showForm = true;
	}

	private toggleForm(showForm?: boolean) {
		if (showForm == undefined)
			showForm = !this.showForm;

		if (this.showForm = showForm)
			this.newRole = new Role();
	}

	private onSave(role: Role) {
		this.toggleForm(false);

		for (let index in this.roles) {
			if (this.roles[index]._id == role._id) {
				this.roles[index] = role;
				return;
			}
		}

		this.roles.push(role);
	}

	private onCancel() {
		this.toggleForm(false);
	}
}
