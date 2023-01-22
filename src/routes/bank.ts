import express, { Router } from "express";
import { checkReachable, getAllBanks, getBankInformation, putBankStatusToApproved, putBankStatusToRejected, putBankInformation } from "../controllers/bank";
import { multerFileUploader } from "../helpers/multerFileUpload";
import { isAdminAuthenticated } from "../middlewares/isAdminAuthenticated";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.get("/information", isUserAuthenticated, getBankInformation);

router.put("/information", isUserAuthenticated, multerFileUploader.single('doc'), putBankInformation);

router.get("/admin/all", isAdminAuthenticated, getAllBanks);

router.put("/admin/:bankId/accept", isAdminAuthenticated, putBankStatusToApproved);

router.put("/admin/:bankId/reject", isAdminAuthenticated, putBankStatusToRejected);

export default router;
