import { Response } from "express";
import { Types } from "mongoose";
import { UserModel } from "../models/user.model";
import {
  deleteFavoriteByArtistAndUser,
  findFavoriteByArtistAndUser,
  findFavoriteCountByArtistId,
  findFavoritesByUser,
} from "../repo/favorite";
import Favorite from "../schema/favorite";
import { incrementUserTotalFavoritesBy1 } from "./user";

export const getFavoriteCountOfArtist = async (
  artistId: string
): Promise<number> => {
  return await findFavoriteCountByArtistId(artistId);
};

export const isArtistFavoriteOfUser = async (
  artistId: string,
  userId: string
): Promise<boolean> => {
  try {
    const favorite = await findFavoriteByArtistAndUser(artistId, userId);

    if (favorite) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const addArtistToUserFavorites = async (
  artistId: string,
  user: UserModel,
  res: Response
) => {
  try {
    const favorite = await findFavoriteByArtistAndUser(artistId, user._id);

    if (favorite) {
      return res.status(200).json({
        success: true,
        isFavorite: true,
        message: "Artist already added to favorite",
      });
    } else {
      const newFavorite = new Favorite({
        _id: new Types.ObjectId(),
        user: user._id,
        artist: artistId,
      });

      await newFavorite.save();
      incrementUserTotalFavoritesBy1(artistId);

      return res.status(200).json({
        success: true,
        isFavorite: true,
        message: "Artist added to favorite",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeArtistFromUserFavorites = async (
  artistId: string,
  user: UserModel,
  res: Response
) => {
  try {
    await deleteFavoriteByArtistAndUser(artistId, user._id);

    return res.status(200).json({
      success: true,
      isFavorite: false,
      message: "Artist removed from favorites",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const allUserFavorites = async (user: UserModel, res: Response) => {
  try {
    const favorites = await findFavoritesByUser(user._id);

    return res.status(200).json({
      success: true,
      favorites: favorites,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
