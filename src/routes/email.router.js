import { Router } from "express";
import { sendEmailToResetPassword, resetPassword, updatePassword} from "../config/mailer.config.js"; // sacar esto al controller
import { renderResetPassword, renderEmailSent } from "../controllers/emailController.js";

const router = Router();
router.post("/send-email-to-reset", sendEmailToResetPassword);
router.get("/reset-password/:token", resetPassword);
router.get("/reset-password", renderResetPassword);
router.get('/email-sent', renderEmailSent);
router.post('/update-password/:token', updatePassword)
export default router;
