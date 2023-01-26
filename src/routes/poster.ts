import express, { Router } from "express";
import { checkReachable, deletePoster, getLoggedInUserAllPosters, getPosterDetails, getPosterDetailsLess, getUserAllPostersByParamsUserId, postPoster, putPoster } from "../controllers/poster";
import { multerImageUploader } from "../helpers/multerImageUpload";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";
import { isUserAuthorized } from "../middlewares/isUserAuthorized";

const router: Router = express.Router();

router.get("/", checkReachable);

router.get("/all", isUserAuthenticated, getLoggedInUserAllPosters);

router.get("/user/:userId", isUserAuthenticated, getUserAllPostersByParamsUserId);

router.get("/details/:posterId", getPosterDetails);
router.get("/details-less/:posterId", getPosterDetailsLess);

router.post("/create", isUserAuthenticated,  multerImageUploader.array('images', 3), postPoster);

router.put("/update", isUserAuthenticated,  multerImageUploader.array('images', 3), isUserAuthorized, putPoster);

router.delete("/delete/:posterId", isUserAuthenticated, isUserAuthorized, deletePoster);

export default router;
