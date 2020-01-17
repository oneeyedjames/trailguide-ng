import { NgModule } from '@angular/core';

import { Model } from '../lib/model.module';

export interface ContentModel extends Model {
	createdBy: string;
	createdAt: Date;
	modifiedBy: string;
	modifiedAt: Date;
}

export interface PublicContentModel extends ContentModel {
	title: string;
	publishedAt: Date;
}

@NgModule()
export class ContentModule {}
