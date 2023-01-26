import { Response } from "express";
import { Types } from "mongoose";
import { PosterModel } from "../models/poster.model";
import { UserModel } from "../models/user.model";
import {
  deletePosterById,
  findPosterById,
  findPostersByTitle,
  findPostersByUserId,
  findTopNPostersByMostDonationsAndViewsCount,
  incrementTotalDonationsBy1,
  incrementTotalViewsBy1,
  populatePosterUser,
  updatePosterById,
} from "../repo/poster";
import Poster from "../schema/poster";
import { getCommentsByPoster } from "./comment";
import { getDonationsByPoster } from "./donation";
import { getFavoriteCountOfArtist } from "./favorite";

export const userAllPosters = async (userId: string, res: Response) => {
  try {
    const posters = await findPostersByUserId(userId);

    return res.status(200).json({
      success: true,
      posters: posters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const posterDetails = async (posterId: string, res: Response) => {
  try {
    let poster = await findPosterById(posterId);
    if (poster) {
      const [comments, totalFavorites, donations] = await Promise.all([
        getCommentsByPoster(posterId),
        getFavoriteCountOfArtist(poster?.user as string),
        getDonationsByPoster(posterId),
      ]);
      poster = await populatePosterUser(poster);

      incrementTotalViewsBy1(posterId);
      return res.status(200).json({
        success: true,
        poster: poster,
        comments: comments,
        totalFavorites: totalFavorites,
        donations: donations,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Poster does not exist!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const posterDetailsLess = async (posterId: string, res: Response) => {
  try {
    let poster = await findPosterById(posterId);
    if (poster) {
      const totalFavorites = getFavoriteCountOfArtist(poster?.user as string)
      poster = await populatePosterUser(poster);

      incrementTotalViewsBy1(posterId);
      return res.status(200).json({
        success: true,
        poster: poster,
        totalFavorites: totalFavorites,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Poster does not exist!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const createPoster = async (
  user: UserModel,
  poster: PosterModel,
  res: Response
) => {
  try {
    const newPoster = new Poster({
      _id: new Types.ObjectId(),
      title: poster.title,
      date: poster.date,
      description: poster.description,
      fanNotes: poster.fanNotes,
      location: poster.location,
      imagesUrls: poster.imagesUrls,
      user: user._id,
    });

    await newPoster.save();

    return res.status(200).json({
      success: true,
      message: "Successfully created poster",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updatePoster = async (poster: PosterModel, res: Response) => {
  try {
    if (poster._id) {
      await updatePosterById(poster._id, poster);
    }

    return res.status(200).json({
      success: true,
      message: "Successfully updated poster",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removePoster = async (id: string, res: Response) => {
  try {
    await deletePosterById(id);

    return res.status(200).json({
      success: true,
      message: "Successfully deleted poster",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getTopNPostersByMostDonationsAndViewsCount = async (
  count: number
) => {
  return await findTopNPostersByMostDonationsAndViewsCount(count);
};

export const getPostersByTitle = async (title: string) => {
  return await findPostersByTitle(title);
};

export const getPostersByUserId = async (userId: string) => {
  return await findPostersByUserId(userId);
};

export const getPosterById = async (posterId: string) => {
  return await findPosterById(posterId);
};

export const incrementPosterTotalViewsBy1 = (posterId: string) => {
  return incrementTotalViewsBy1(posterId);
};

export const incrementPosterTotalDonationsBy1 = (posterId: string) => {
  return incrementTotalDonationsBy1(posterId);
};