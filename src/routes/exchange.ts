import express, { Router } from "express";
import { checkReachable, getAllExchanges, getUserAllExchanges, postCreateExchange, postExchangeStatusToApproved, postExchangeStatusToRejected } from "../controllers/exchange";
import { isAdminAuthenticated } from "../middlewares/isAdminAuthenticated";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.get("/", isUserAuthenticated, postCreateExchange);

router.get("/all", isUserAuthenticated, getUserAllExchanges);

router.get("/admin/all", isAdminAuthenticated, getAllExchanges);

router.post("/admin/accept", isAdminAuthenticated, postExchangeStatusToApproved);

router.post("/admin/reject", isAdminAuthenticated, postExchangeStatusToRejected);

export default router;
