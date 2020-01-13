import { Model } from './model';
import { ModelService } from './model-service';
import { LocalCache } from './cache';

export class CacheService<T extends Model> extends ModelService<T> {
	protected cache: LocalCache;

	public getAllCached(): Promise<T[]> {
		let items = this.cache.searchDocuments(this.listPath);
		if (items.length) return Promise.resolve(items);

		return this.getAll();
	}

	public getOneCached(id: string): Promise<T> {
		if (this.cache.hasDocument(this.listPath, id)) {
			let item: T = this.cache.getDocument(this.listPath, id);
			return Promise.resolve(item);
		}

		return this.getOne(id);
	}

	public getAll(): Promise<T[]> {
		return super.getAll().then((items: T[]) => {
			for (let item of items)
				this.cache.putDocument(this.listPath, item._id, item);

			return items;
		});
	}

	public getOne(id: string): Promise<T> {
		return super.getOne(id).then((item: T) => {
			this.cache.putDocument(this.listPath, item._id, item);
			return item;
		});
	}

	public create(item: T): Promise<T> {
		return super.create(item).then((item: T) => {
			this.cache.putDocument(this.listPath, item._id, item);
			return item;
		});
	}

	public update(item: T): Promise<T> {
		// Failure in the API request will result in lost cache data
		// this.cache.removeDocument(this.listPath, item._id);
		return super.update(item).then((item: T) => {
			this.cache.putDocument(this.listPath, item._id, item);
			return item;
		});
	}

	public delete(item: T): Promise<T> {
		return super.delete(item).then((item: T) => {
			this.cache.removeDocument(this.listPath, item._id);
			return item;
		});
	}
}
