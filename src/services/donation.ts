import { Response } from "express";
import { Types } from "mongoose";
import { DonationModel } from "../models/donation.model";
import { UserModel } from "../models/user.model";
import { findDonationsByPoster, findDonationsByArtist, findDonationsByUser, findArtistTotalHearts } from "../repo/donation";
import Donation from "../schema/donation";
import { getPackageById } from "./package";
import { getPosterById, incrementPosterTotalDonationsBy1 } from "./poster";

export const createDonation = async (
  donation: DonationModel,
  user: UserModel,
  res: Response
) => {
  try {
    if (!donation?.status) {
      return res.status(400).json({
        success: false,
        message: "Donation status must be provided, 1=Failed, Any number other than 1=Success",
      });
    } else if (donation?.status == 1) {
      return res.status(200).json({
        success: false,
        message: "Payment failed. This error is force generated.",
      });
    }

    const [poster, donationPackage] = await Promise.all([
      getPosterById(donation.poster),
      getPackageById(donation.package),
    ]);

    if (!poster || !donationPackage) {
      return res.status(400).json({
        success: false,
        message: "Cannote donate! Invalid Poster or Package",
      });
    }

    const newDonation = new Donation({
      _id: new Types.ObjectId(),
      user: user._id,
      artist: poster.user,
      poster: donation.poster,
      package: donation.package,
      quantity: donation.quantity,
      packageCopy: {
        name: donationPackage.name,
        hearts: donationPackage.hearts,
        price: donationPackage.price,
      },
      totalHearts: donationPackage.hearts * donation.quantity,
      totalPrice: donationPackage.price * donation.quantity,
      status: donation.status,
    });

    await newDonation.save();

    incrementPosterTotalDonationsBy1(donation.poster);
    return res.status(200).json({
      success: true,
      message: "Successfully Donated!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const fanDonationHistory = async (user: UserModel, res: Response) => {
  try {
    const donations = await findDonationsByUser(user._id);

    return res.status(200).json({
      success: true,
      donations: donations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const artistDonationHistory = async (user: UserModel, res: Response) => {
  try {
    const donations = await findDonationsByArtist(user._id);

    return res.status(200).json({
      success: true,
      donations: donations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getDonationsByPoster = async (poster: string) => {
  return await findDonationsByPoster(poster);
}

export const getArtistTotalHearts = async (artist: string) => {
  return await findArtistTotalHearts(artist);
}