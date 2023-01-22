import { UserRoles } from "../enum/userRole.enum";

export class UserModel {
    _id: string;
    name: string;
    email: string;
    artist: {
        name: string,
        description: string,
    };
    imageUrl: string;
    role: UserRoles;
    totalViews: number;
    totalFavorites: number;

    constructor(user: any){
        this._id = user._id;
        this.name = user.name;
        this.email = user.email;
        this.artist = {
            name: user.artist?.name || null,
            description: user.artist?.description || null
        };
        this.imageUrl = user.imageUrl || '';
        this.role = user.role;
        this.totalViews = user.totalViews;
        this.totalFavorites = user.totalFavorites;
    }
}