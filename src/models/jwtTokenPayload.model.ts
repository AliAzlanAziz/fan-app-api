import { UserRoles } from "../enum/userRole.enum";

export class JWTTokenPayloadModel {
    id: string;
    role: UserRoles

    constructor(id: string, role: UserRoles){
        this.id = id;
        this.role = role;
    }
}