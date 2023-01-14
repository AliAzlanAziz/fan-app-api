import { UserModel } from "./user.model";

export class ContextModel  {
    user: UserModel

    constructor(_id: string, name: string, email: string){
        this.user = new UserModel(_id, name, email)
    }
}