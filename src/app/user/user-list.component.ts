import { Component, OnInit } from '@angular/core';

import { User }        from './user.model';
import { UserService } from './user.service';

@Component({
	selector: 'tg-user-list',
	templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
	private users: User[];
	private newUser: User;

	private showForm: boolean;

	public constructor(private userService: UserService) {}

	public ngOnInit() {
		this.userService.getAll()
		.then((users: User[]) => this.users = users);
	}

	private editUser(user: User) {
		this.toggleForm(true, user);
	}

	private deleteUser(user: User) {
		if (confirm('Are you sure you want to delete this user?')) {
			this.userService.delete(user)
			.then(this.onDelete.bind(this));
		}
	}

	private toggleForm(showForm?: boolean, user?: User) {
		if (showForm == undefined)
			showForm = !this.showForm;

		if (user == undefined)
			user = new User();

		if (this.showForm = showForm)
			this.newUser = user;
	}

	private onSave(user: User) {
		let index = this.users.findIndex(item => item._id == user._id);
		if (index >= 0)
			this.users[index] = user;
		else
			this.users.push(user);

		this.toggleForm(false);
	}

	private onDelete(user: User) {
		let index = this.users.findIndex(item => item._id == user._id);
		if (index >= 0)
			this.users.splice(index, 1);

		this.toggleForm(false);
	}

	private onCancel() {
		this.toggleForm(false);
	}
}
