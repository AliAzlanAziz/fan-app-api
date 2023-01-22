import express, { Router } from "express";
import { checkReachable, getAllExchanges, getUserAllExchanges, postCreateExchange, putExchangeStatusToApproved, putExchangeStatusToRejected } from "../controllers/exchange";
import { isAdminAuthenticated } from "../middlewares/isAdminAuthenticated";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.post("/", isUserAuthenticated, postCreateExchange);

router.get("/all", isUserAuthenticated, getUserAllExchanges);

router.get("/admin/all", isAdminAuthenticated, getAllExchanges);

router.put("/admin/:exchangeId/accept", isAdminAuthenticated, putExchangeStatusToApproved);

router.put("/admin/:exchangeId/reject", isAdminAuthenticated, putExchangeStatusToRejected);

export default router;
