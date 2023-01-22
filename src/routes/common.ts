import express, { Router } from "express";
import { checkReachable, getArtistByNameOrPosterByTitle, getTop5ArtistsAndPosters } from "../controllers/common";

const router: Router = express.Router();

router.get("/", checkReachable);

router.get("/top-artists-and-posters", getTop5ArtistsAndPosters);

router.get("/search", getArtistByNameOrPosterByTitle);

export default router;
