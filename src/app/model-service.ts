import { Http, Response, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Model } from './model';

export class ModelService<T extends Model> {
    protected headers: Headers = new Headers({'Content-Type': 'application/json'});

	private hostName: string = 'localhost:3000';
    private basePath: string = '/api/v1';

    constructor(protected http: Http, private listPath: string, private itemPath: string = '') {
        this.itemPath = itemPath || listPath;
    }

    public getAll(): Promise<T[]> {
        return this.http.get(this.getUrl()).toPromise()
            .then((response: Response) => response.json() as T[])
            .catch(this.handleError);
    }

    public getOne(id: string): Promise<T> {
        return this.http.get(this.getUrl(id)).toPromise()
            .then((response: Response) => response.json() as T)
            .catch(this.handleError);
    }

	public save(item: T): Promise<T> {
		return item._id ? this.update(item) : this.create(item);
	}

    public create(item: T): Promise<T> {
        return this.http.post(this.getUrl(), JSON.stringify(item), { headers: this.headers })
            .toPromise().then((response: Response) => response.json() as T)
            .catch(this.handleError);
    }

    public update(item: T): Promise<T> {
        return this.http.put(this.getUrl(item._id), JSON.stringify(item), { headers: this.headers })
            .toPromise().then((response: Response) => response.json() as T)
            .catch(this.handleError);
    }

    public delete(item: T): Promise<T> {
        return this.http.delete(this.getUrl(item._id)).toPromise()
            .then((response: Response) => item)
            .catch(this.handleError);
    }

    protected getPath(id?: string): string {
        return id
            ? `${this.basePath}/${this.itemPath}/${id}`
            : `${this.basePath}/${this.listPath}`;
    }

	protected getUrl(id?: string): string {
		return 'http://' + this.hostName + this.getPath(id);
	}

    public getChildren<TObject extends Model>(parentPath: string, parentItem: TObject): Promise<T[]> {
        const path = this.getChildPath(parentPath, parentItem);

        return this.http.get(path).toPromise()
            .then((response: Response) => response.json() as T[])
            .catch(this.handleError);
    }

    public createChild<TObject extends Model>(parentPath: string, parentItem: TObject, item: T): Promise<T> {
        const path = this.getChildPath(parentPath, parentItem);

        return this.http.post(path, JSON.stringify(item), { headers: this.headers })
            .toPromise().then((response: Response) => response.json() as T)
            .catch(this.handleError);
    }

    protected getChildPath<TObject extends Model>(parentPath: string, parentItem: TObject) {
        return `${this.basePath}/${parentPath}/${parentItem._id}/${this.listPath}`;
    }

    protected handleError(error: any) {
        console.error(error);
        return Promise.reject(error.message || error);
    }
}
