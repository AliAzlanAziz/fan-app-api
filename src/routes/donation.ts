import express, { Router } from "express";
import { checkReachable, getArtistDonationHistory, getFanDonationHistory, postDonation } from "../controllers/donation";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.post("/", isUserAuthenticated, postDonation);

router.get("/fan", isUserAuthenticated, getFanDonationHistory);

router.get("/artist", isUserAuthenticated, getArtistDonationHistory);

export default router;
