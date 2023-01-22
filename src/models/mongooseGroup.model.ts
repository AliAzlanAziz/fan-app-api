export class MongooseGroup {
    _id: string|null;
    total: number;

    constructor(_id: string|null, total: number){
        this._id = _id;
        this.total = total
    }
}