export class LocalCache {
	private defaultDocumentFilter = (doc: any, id: string) => true;

	private defaultTemplateTimeout: number = NaN;

	private cache = window.localStorage;

	private hasString(key: string): boolean {
		if (key.match(/\/expire$/i))
			return false;

		let expire = parseInt(this.cache.getItem(`${key}/expire`));
		if (expire < Date.now()) {
			this.removeString(key);
			return false;
		}

		return this.cache.hasOwnProperty(key);
	}

	private getString(key: string): string {
		return this.hasString(key) ? this.cache.getItem(key) : null;
	}

	private putString(key: string, value: string, timeout?: string|number) {
		if (value !== null && value !== '') {
			let realTimeout = typeof timeout === 'string' ? parseInt(timeout) : timeout;
			if (realTimeout > 0) {
				setTimeout(() => this.removeString(key), realTimeout);

				this.cache.setItem(`${key}/expire`, (Date.now() + realTimeout).toString());
			}

			this.cache.setItem(key, value);
		}
	}

	private removeString(key: string) {
		this.cache.removeItem(key);
		this.cache.removeItem(`${key}/expire`);
	}

	private getObject(key: string): any {
		return JSON.parse(this.getString(key));
	}

	private putObject(key: string, value: any, timeout?: string|number) {
		this.putString(key, JSON.stringify(value), timeout);
	}

	private getDocumentKey(collection: string, id: string|number): string {
		return ['document', collection, id.toString()].join('/');
	}

	private getTemplateKey(collection: string, view: string): string {
		return ['template', collection, view].join('/');
	}

	private generateUUID(): string {
		return Math.floor(Math.random() * Math.pow(16, 8)).toString(16) + '-'
			+ Math.floor(Math.random() * Math.pow(16, 4)).toString(16) + '-'
			+ Math.floor(Math.random() * Math.pow(16, 4)).toString(16) + '-'
			+ Math.floor(Math.random() * Math.pow(16, 4)).toString(16) + '-'
			+ Math.floor(Math.random() * Math.pow(16, 12)).toString(16);
	}

	public setDefaultTemplateTimeout(timeout: string|number) {
		this.defaultTemplateTimeout = typeof timeout === 'string' ? parseInt(timeout) : timeout;
	}

	public clear() {
		this.cache.clear();
	}

	public searchDocuments(collection: string, filter: (doc: any, id: string) => boolean) {
		filter = filter || this.defaultDocumentFilter;

		let docs = [];

		for (let i = 0, n = this.cache.length; i < n; i++) {
			let key = this.cache.key(i);

			if (this.hasString(key)) {
				let path = key.split('/');

				if (path[0] == 'document' && path[1] == collection) {
					let doc = this.getObject(key);

					if (filter(doc, path[2]))
						docs.push(doc);
				}
			}
		}

		return docs;
	}

	public hasDocument(collection: string, documentId: string|number): boolean {
		return this.hasString(this.getDocumentKey(collection, documentId));
	}

	public getDocument(collection: string, documentId: string|number): any {
		return this.getObject(this.getDocumentKey(collection, documentId));
	}

	public putDocument(collection: string, documentId: string|number, document: any, timeout?: string|number): string {
		let realDocId = documentId.toString() || this.generateUUID();

		this.putObject(this.getDocumentKey(collection, realDocId), document, timeout);

		return realDocId;
	}

	public removeDocument(collection: string, documentId: string|number) {
		this.removeString(this.getDocumentKey(collection, documentId));
	}

	public hasTemplate(collection: string, view: string): boolean {
		return this.hasString(this.getTemplateKey(collection, view));
	}

	public getTemplate(collection: string, view: string): string {
		return this.getString(this.getTemplateKey(collection, view));
	}

	public putTemplate(collection: string, view: string, template: string, timeout?: string|number) {
		let realTimeout = typeof timeout === 'string' ? parseInt(timeout) : timeout;
		if (isNaN(realTimeout))
			realTimeout = this.defaultTemplateTimeout;

		this.putString(this.getTemplateKey(collection, view), template, realTimeout);
	}

	public removeTemplate(collection: string, view: string) {
		this.removeString(this.getTemplateKey(collection, view));
	}
}
