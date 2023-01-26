export class UserUpdateModel {
    name: string;
    isUpdatingPassword: boolean;
    password: string|undefined;
    imageUrl: string|undefined;

    constructor(name: string, isUpdatingPassword: boolean, password: string|undefined, imageUrl: string|undefined){
        this.name = name;
        this.isUpdatingPassword = isUpdatingPassword;
        this.password = password;
        this.imageUrl = imageUrl;
    }
}