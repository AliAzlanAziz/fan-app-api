export class PosterModel {
    _id: string|undefined;
    title: string;
    date: string;
    location: string;
    description: string;
    fanNotes: string;
    ticketLink: string;
    imagesUrls: string[];

    constructor(_id: string|undefined, title: string, date: string, location: string, description: string, fanNotes: string, ticketLink: string, imagesUrls: string[]){
        this._id = _id;
        this.title = title;
        this.date = date;
        this.location = location;
        this.description = description;
        this.fanNotes = fanNotes;
        this.ticketLink = ticketLink;
        this.imagesUrls = imagesUrls;
    }
}