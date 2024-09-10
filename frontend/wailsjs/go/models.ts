export namespace main {
	
	export class Board {
	    _id: string;
	    title: string;
	    workspaceId: string;
	    backgroundColor: string;
	    createdAt: number;
	    updatedAt: number;
	
	    static createFrom(source: any = {}) {
	        return new Board(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this._id = source["_id"];
	        this.title = source["title"];
	        this.workspaceId = source["workspaceId"];
	        this.backgroundColor = source["backgroundColor"];
	        this.createdAt = source["createdAt"];
	        this.updatedAt = source["updatedAt"];
	    }
	}
	export class BoardIdentity {
	    _id: string;
	    title: string;
	    path: string;
	
	    static createFrom(source: any = {}) {
	        return new BoardIdentity(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this._id = source["_id"];
	        this.title = source["title"];
	        this.path = source["path"];
	    }
	}

}

