import express, { Router } from "express";
import { checkReachable, postComment } from "../controllers/comment";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.post("/", isUserAuthenticated, postComment);

export default router;
