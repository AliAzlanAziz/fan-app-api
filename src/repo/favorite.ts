import Favorite from "../schema/favorite"

export const findFavoriteCountByArtistId = async (artist: string): Promise<number> => {
    return await Favorite.find({artist: artist}).lean().count();
}

export const findFavoriteByArtistAndUser = async (artist: string, user: string) => {
    return await Favorite.findOne({artist: artist, user: user});
}

export const deleteFavoriteByArtistAndUser = async (artist: string, user: string) => {
    return await Favorite.findOneAndDelete({artist: artist, user: user});
}

export const findFavoritesByUser = async (user: string) => {
    return await Favorite.find({user: user})
                            .populate('artist', '_id name artist imageUrl')
                            .select('_id artist');
}