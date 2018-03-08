import { Model } from '../model';

export const Resources = [
	'issue',
	'chapter',
	'article'
];

export const Actions = [
	'create',
	'update',
	'delete'
];

export interface Permission {
	action: string;
	resource: string;
	override: boolean;
}

export class Role implements Model {
	_id: string;
    title: string;
    description: string;
	permissions: Permission[];
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
