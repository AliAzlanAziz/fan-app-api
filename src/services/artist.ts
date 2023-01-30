import { Request, Response } from "express";
import { ArtistUpdateModel } from "../models/artistUpdate.model";
import { UserModel } from "../models/user.model";

import {
  findUserByArtistName,
  updateUserArtistProfileById,
  findUserById,
  incrementTotalViewsBy1,
} from "../repo/user";
import { getFavoriteCountOfArtist, isArtistFavoriteOfUser } from "./favorite";
import { getPostersByUserId } from "./poster";

export const updateArtistProfile = async (
  user: UserModel,
  req: Request,
  res: Response
) => {
  try {
    if (req.body?.name?.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Artist name length must be atleast 1 character",
      });
    }

    const doesArtistExist = await findUserByArtistName(req.body?.name);
    if (doesArtistExist && doesArtistExist.artist?.name != user.artist.name) {
      return res.status(200).json({
        success: false,
        uniqueName: false,
        message: "Artist name already taken",
      });
    }

    await updateUserArtistProfileById(user._id, {
      imageUrl: req.file?.filename,
      artist: {
        name: req.body?.name,
        description: req.body?.description,
      }
    });

    return res.status(200).json({
      success: true,
      name: req.body?.name,
      imageUrl: req.file?.filename,
      message: "Successfully updated user's artist profile!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating user's artist profile!",
    });
  }
};

export const artistProfileDetails = async (
  user: UserModel,
  artistId: string,
  res: Response
) => {
  try {
    const userArtist = await findUserById(artistId);

    if (!userArtist?.artist?.name) {
      return res.status(400).json({
        success: false,
        message: "User is not an artist",
      });
    }

    const [isFavorite, posters] = await Promise.all([
      isArtistFavoriteOfUser(artistId, user?._id),
      getPostersByUserId(artistId),
    ]);

    incrementTotalViewsBy1(userArtist._id as string);

    return res.status(200).json({
      success: true,
      user: {
        _id: userArtist._id,
        artist: userArtist.artist,
        imageUrl: userArtist.imageUrl,
        totalFavorites: userArtist.totalFavorites,
        totalPosters: userArtist.totalPosters,
        posters: posters,
        isFavorite: isFavorite,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
