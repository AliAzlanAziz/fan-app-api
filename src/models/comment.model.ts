export class CommentModel {
    poster: string;
    text: string;

    constructor(poster: string, text: string){
        this.poster = poster;
        this.text = text;
    }
}