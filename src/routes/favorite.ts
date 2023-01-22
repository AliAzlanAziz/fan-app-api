import express, { Router } from "express";
import { checkReachable, deleteArtistFromUsersFavorite, getAllUserFavorites, postAddArtistToUsersFavorite } from "../controllers/favorite";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.post("/", isUserAuthenticated, postAddArtistToUsersFavorite);

router.delete("/", isUserAuthenticated, deleteArtistFromUsersFavorite);

router.get("/all", isUserAuthenticated, getAllUserFavorites);

export default router;
