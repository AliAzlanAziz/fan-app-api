import { Response } from "express";
import { Types } from "mongoose";
import { findAllPackages, findPackageById } from "../repo/package";
import Package from "../schema/package";

export const AllPackages = async (res: Response) => {
  try {
    // await Package.deleteMany({})
    // await new Package({
    //   _id: new Types.ObjectId(),
    //   name: 'A spoon of hearts',
    //   icon: 'spoon.png',
    //   hearts: 10,
    //   price: 10*330,
    // }).save();
    
    // await new Package({
    //   _id: new Types.ObjectId(),
    //   name: 'A handful of hearts',
    //   icon: 'handful.png',
    //   hearts: 30,
    //   price: 30*330,
    // }).save();
    
    // await new Package({
    //   _id: new Types.ObjectId(),
    //   name: 'A bunch of hearts',
    //   icon: 'bunch.png',
    //   hearts: 50,
    //   price: 50*330,
    // }).save();
    
    // await new Package({
    //   _id: new Types.ObjectId(),
    //   name: 'A box of hearts',
    //   icon: 'box.png',
    //   hearts: 100,
    //   price: 100*330,
    // }).save();
    
    // await new Package({
    //   _id: new Types.ObjectId(),
    //   name: 'A bucket of hearts',
    //   icon: 'bucket.png',
    //   hearts: 300,
    //   price: 300*330,
    // }).save();
    
    // await new Package({
    //   _id: new Types.ObjectId(),
    //   name: 'Hearts bomb',
    //   icon: 'bomb.png',
    //   hearts: 500,
    //   price: 500*330,
    // }).save();

    const packages = await findAllPackages();

    return res.status(200).json({
        success: true,
        packages: packages
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
};

export const getAllPackages = async () => {
  return await findAllPackages();
};

export const getPackageById = async (packageId: string) => {
  return await findPackageById(packageId);
};