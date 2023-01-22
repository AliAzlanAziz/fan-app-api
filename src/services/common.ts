import { Response } from "express";
import {
  getPostersByTitle,
  getTopNPostersByMostDonationsAndViewsCount,
} from "./poster";
import {
  getTopNArtistsByMostFavoritesAndViewsCount,
  getUsersByArtistName,
} from "./user";

export const top5ArtistsAndPosters = async (res: Response) => {
  try {
    const artists = await getTopNArtistsByMostFavoritesAndViewsCount(5);
    const posters = await getTopNPostersByMostDonationsAndViewsCount(5);

    return res.status(200).json({
      success: true,
      artists,
      posters,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Interal server error",
    });
  }
};

export const searchByArtistNameOrPosterTitle = async (
  nameOrTitle: string,
  res: Response
) => {
  try {
    const [artists, posters] = await Promise.all([
      getUsersByArtistName(nameOrTitle),
      getPostersByTitle(nameOrTitle),
    ]);

    return res.status(200).json({
      success: true,
      artists: artists,
      posters: posters,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interal server error",
    });
  }
};
