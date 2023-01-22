import express, { Router } from "express";
import {
  checkReachable,
  postSignup,
  postSignin,
  getUserProfile,
  putUserProfie,
  postAdminSignup,
  postAdminSignin,
} from "../controllers/user";
import { multerImageUploader } from "../helpers/multerImageUpload";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.post("/signup", postSignup);

router.post("/signin", postSignin);

router.post("/admin/signup", postAdminSignup);

router.post("/admin/signin", postAdminSignin);

router.get("/profile", isUserAuthenticated, getUserProfile);

router.put("/profile", isUserAuthenticated, multerImageUploader.single('image'), putUserProfie);

export default router;
