export class UserSignupModel {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;

    constructor(name: string, email: string, password: string, confirmPassword: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}