import express, { Router } from "express";
import { getAllPackages } from "../controllers/package";

const router: Router = express.Router();

router.get("/all", getAllPackages);

export default router;