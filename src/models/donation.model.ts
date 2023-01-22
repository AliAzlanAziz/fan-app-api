export class DonationModel {
    poster: string;
    package: string;
    quantity: number;
    status: number;

    constructor(poster: string, package: string, quantity: number, status: number){
        this.poster = poster;
        this.package = package;
        this.quantity = quantity;
        this.status = status;
    }
}