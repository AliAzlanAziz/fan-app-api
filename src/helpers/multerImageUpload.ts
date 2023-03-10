import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const checkFileType = function (file: Express.Multer.File, cb: FileFilterCallback) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png/; //check extension names

  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb(new Error('Only jpeg, jpg and png images can by uploaded'));
  }
};

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./src/uploadedImages",
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, `${req.context.user._id}--${file.originalname}`);
  },
});

export const multerImageUploader = multer({
  storage: storageEngine,
  limits: { fileSize: 30000000 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    checkFileType(file, cb);
  },
});
