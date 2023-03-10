import express, { Router } from "express";
import { checkReachable, getAllExchanges, getExchangeInfo, getExchangeInfoAdmin, getUserAllExchanges, postCreateExchange, putExchangeStatusToApproved, putExchangeStatusToRejected } from "../controllers/exchange";
import { isAdminAuthenticated } from "../middlewares/isAdminAuthenticated";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.post("/", isUserAuthenticated, postCreateExchange);

router.get("/all", isUserAuthenticated, getUserAllExchanges);
router.get("/details/:exchangeId", isUserAuthenticated, getExchangeInfo);

router.get("/admin/all", isAdminAuthenticated, getAllExchanges);
router.get("/admin/:exchangeId", isAdminAuthenticated, getExchangeInfoAdmin);

router.put("/admin/:exchangeId/accept", isAdminAuthenticated, putExchangeStatusToApproved);

router.put("/admin/:exchangeId/reject", isAdminAuthenticated, putExchangeStatusToRejected);

export default router;
