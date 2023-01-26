import { PosterModel } from "../models/poster.model";
import Poster from "../schema/poster"

export const findTopNPostersByMostDonationsAndViewsCount = async (limit: number) => {
    return await Poster.find()
                        .populate('user', '_id name imageUrl artist totalFavorites')
                        .select('_id user title date location description fanNotes imagesUrls totalViews totalDonations')
                        .sort({totalDonations: -1, totalViews: -1})
                        .limit(limit);
}

export const findPostersByUserId = async (user: string) => {
    return await Poster.find({user: user})
                        .populate('user', '_id name imageUrl artist totalFavorites')
                        .select('_id title date location imagesUrls user');
}

export const findPosterById = async (id: string) => {
    return await Poster.findById(id);
}

export const populatePosterUser = async (poster: any) => {
    return await Poster.populate(poster, {path: 'user', select: '_id name imageUrl artist totalFavorites'});
}

export const findPostersByTitle = async (title: string) => {
    return await Poster.find({title: {'$regex': title, '$options': 'ix'}})
                        .populate("user", "_id name imageUrl artist totalFavorites")
                        .select("_id user title date location description fanNotes imagesUrls");
}

export const updatePosterById = async (id: string, poster: PosterModel) => {
    return await Poster.findByIdAndUpdate(id, poster);
}

export const deletePosterById = async (id: string) => {
    return await Poster.findByIdAndDelete(id);
}

export const incrementTotalViewsBy1 = async (id: string) => {
    return await Poster.findByIdAndUpdate(id, { $inc: {totalViews: 1}});
}

export const incrementTotalDonationsBy1 = async (id: string) => {
    return await Poster.findByIdAndUpdate(id, { $inc: {totalDonations: 1}});
}
