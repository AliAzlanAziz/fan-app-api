import express, { Router } from "express";
import { checkReachable, getArtistProfileDetails, putArtistProfile } from "../controllers/artist";
import { multerImageUploader } from "../helpers/multerImageUpload";
import { addContextIfExist } from "../middlewares/addContextIfExist";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";
import { mayUserAuthenticated } from "../middlewares/mayUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.put("/profile", isUserAuthenticated, multerImageUploader.single('image'), putArtistProfile);

router.get("/profile/:artistId", mayUserAuthenticated, getArtistProfileDetails);

export default router;
