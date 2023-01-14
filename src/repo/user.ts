import User from "../schema/user";

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email: email });
}

export const findUserById = async (id: string) => {
    return await User.findById(id);
}