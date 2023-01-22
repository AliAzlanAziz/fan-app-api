import { UserModel } from "./user.model";

export class ContextModel  {
    user: UserModel

    constructor(user: any){
        this.user = new UserModel(user)
    }
}