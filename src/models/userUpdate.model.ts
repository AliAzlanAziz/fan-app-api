export class UserUpdateModel {
    name: string;
    email: string;
    isUpdatingPassword: boolean;
    password: string|undefined;
    imageUrl: string|undefined;

    constructor(name: string, email: string, 
                isUpdatingPassword: boolean, password: string|undefined, imageUrl: string|undefined){
        this.name = name;
        this.email = email;
        this.isUpdatingPassword = isUpdatingPassword;
        this.password = password;
        this.imageUrl = imageUrl;
    }
}