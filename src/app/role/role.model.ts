import { ContentModel } from '../content.module';

export const Resources = [
	'issue',
	'chapter',
	'article',
	'reply',
	'purchase'
];

export const Actions = [
	'read',
	'create',
	'update',
	'delete'
];

export interface Permission {
	action: string;
	resource: string;
	override: boolean;
}

export class Role implements ContentModel {
	_id: string;
	title: string;
	description: string;
	permissions: Permission[];
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}
