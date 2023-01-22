export enum UserRoles {
    USER = 1,
    ADMIN = 2,
}

export const isAdmin = (role: UserRoles): boolean => {
    return role === UserRoles.ADMIN
}
