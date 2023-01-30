import { Response } from "express";
import Donation from "../schema/donation";
import Exchange from "../schema/exchange";
import Poster from "../schema/poster";
import User from "../schema/user";
import {
  getPostersByTitle,
  getTopNPostersByMostDonationsAndViewsCount,
} from "./poster";
import {
  getTopNArtistsByMostFavoritesAndViewsCount,
  getUsersByArtistName,
} from "./user";

// const updatePosterCount = async(user: any) => {
//   const posters = await Poster.find({user: user._id}).lean().count()
//   console.log('posters: ', user._id)
//   console.log(posters)
//   await User.findByIdAndUpdate(user._id, {
//     totalPosters: posters
//   });
// }

export const top5ArtistsAndPosters = async (res: Response) => {
  try {
    const artists = await getTopNArtistsByMostFavoritesAndViewsCount(5);
    const posters = await getTopNPostersByMostDonationsAndViewsCount(5);

    // await Poster.updateMany({}, {
    //   totalDonations: 0
    // })

    // await Exchange.deleteMany({})
    // await Donation.deleteMany({})
    
    // const users = await User.find().select('_id user title date location description fanNotes imagesUrls totalViews totalDonations')
    // console.log('users')
    // console.log(users)
    // console.log(users.length)
    // users.map(user => {
    //   console.log('user')
    //   console.log(user)
    //   updatePosterCount(user)
    // })

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
