export class DonationModel {
    poster: string;
    package: string;
    quantity: number;
    status: number;

    constructor(poster: string, packageName: string, quantity: number, status: number){
        this.poster = poster;
        this.package = packageName;
        this.quantity = quantity;
        this.status = status;
    }
}