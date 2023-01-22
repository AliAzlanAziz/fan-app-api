import Donation from "../schema/donation";

export const findDonationsByArtist = async (artist: string) => {
  return await Donation.find({ artist: artist })
    .populate("user", "_id name imageUrl")
    .select({ createdAt: 0, artist: 0 });
};

export const findDonationsByUser = async (user: string) => {
  return await Donation.find({ user: user })
    .populate("artist", "_id name imageUrl artist")
    .populate(
      "poster",
      "_id title date location description fanNotes imagesUrls"
    )
    .select({ createdAt: 0, user: 0 });
};

export const findDonationsByPoster = async (poster: string) => {
  return await Donation.find({ poster: poster }).select(
    "_id quantity totalHearts totalPrice status packageCopy"
  );
};

export const findArtistTotalHearts = async (artist: string) => {
  return await Donation.aggregate([
    { $match: { artist: artist, status: 2 } }, //status = 2 (1=completed)
    {
      $group: {
        _id: null,
        total: {
          $sum: "$totalHearts",
        },
      },
    },
  ]);
};