import express, { Router } from "express";
import { checkReachable, getArtistProfileDetails, putArtistProfile } from "../controllers/artist";
import { addContextIfExist } from "../middlewares/addContextIfExist";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.put("/profile", isUserAuthenticated, putArtistProfile);

router.get("/profile/:artistId", isUserAuthenticated, getArtistProfileDetails);

export default router;
