import { NextFunction, Request, Response } from "express";
import fs from "fs";
import path from "path";

import { findPosterById } from "../repo/poster";

export const isUserAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.poster._id || req.params.posterId; // we know this _id is of poster id attached to form data, later we parse it and access by poster._id
    if (!id) {
      deleteUplaodedFiles(req);

      return res.status(400).json({
        success: false,
        message: "poster id must be provided!",
      });
    }

    const poster = await findPosterById(id);
    if (poster && (poster.user as string).toString() != req.context.user._id) {
      deleteUplaodedFiles(req);

      return res.status(400).json({
        success: false,
        message: "Unauthorized access of the poster denied!",
      });
    }

    return next();
  } catch (error) {
    deleteUplaodedFiles(req);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const deleteUplaodedFiles = (req: Request) => {
  (req.files as Express.Multer.File[])?.map((file: any) => {
    const filename: string = path.join(__dirname, "../uploadedImages/") + file.filename;
    
    if (fs.existsSync(filename)) {
      fs.unlinkSync(filename);
    }
  });
};
