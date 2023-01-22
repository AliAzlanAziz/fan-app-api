import { UserRoles } from "../enum/userRole.enum";
import { ArtistUpdateModel } from "../models/artistUpdate.model";
import User from "../schema/user";

export const findUserByEmailAndRole = async (email: string, role: UserRoles) => {
    return await User.findOne({ email: email, role: role });
}

export const findUserById = async (id: string) => {
    return await User.findById(id);
}

export const incrementTotalViewsBy1 = async (id: string) => {
    return await User.findByIdAndUpdate(id, { $inc: {totalViews: 1}});
}

export const incrementTotalFavoritesBy1 = async (id: string) => {
    return await User.findByIdAndUpdate(id, { $inc: {totalFavorites: 1}});
}

export const decrementTotalFavoritesBy1 = async (id: string) => {
    return await User.findOneAndUpdate({_id: id, totalFavorites: { $gt: 0 }}, { $inc: {totalFavorites: -1}});
}

export const updateUserById = async (id: string, user: { name:string, email:string, password:string|undefined, imageUrl:string|undefined }) => {
    return await User.findByIdAndUpdate(id, user);
}

export const findUserByArtistName = async (name: string) => {
    return await User.findOne({'artist.name': name});
}

export const findUsersByArtistName = async (name: string) => {
    return await User.find({'artist.name': {'$regex': name, '$options': 'ix'}})
                        .select("_id name artist imageUrl totalViews totalFavorites");
}

export const updateUserArtistProfileById = async (id: string, artist: ArtistUpdateModel) => {
    return await User.findByIdAndUpdate(id, {artist: artist});
}

export const findTopNArtistsByMostFavoritesAndViewsCount = async (limit: number) => {
    return await User.find({ 'artist.name': { $ne: null } })
                        .select('_id name imageUrl artist totalFavorites totalViews')
                        .sort({totalFavorites: -1, totalViews: -1})
                        .limit(limit);
}