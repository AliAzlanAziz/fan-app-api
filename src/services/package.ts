import { Response } from "express";
import { findAllPackages, findPackageById } from "../repo/package";

export const AllPackages = async (res: Response) => {
  try {
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