import express, { Router } from "express";
import { checkReachable, getAllBanks, getBankInformation, postBankStatusToApproved, postBankStatusToRejected, putBankInformation } from "../controllers/bank";
import { multerFileUploader } from "../helpers/multerFileUpload";
import { isAdminAuthenticated } from "../middlewares/isAdminAuthenticated";
import { isUserAuthenticated } from "../middlewares/isUserAuthenticated";

const router: Router = express.Router();

router.get("/", checkReachable);

router.get("/information", isUserAuthenticated, getBankInformation);

router.put("/information", isUserAuthenticated, multerFileUploader.single('doc'), putBankInformation);

router.get("/admin/all", isAdminAuthenticated, getAllBanks);

router.post("/admin/accept", isAdminAuthenticated, postBankStatusToApproved);

router.post("/admin/reject", isAdminAuthenticated, postBankStatusToRejected);

export default router;
