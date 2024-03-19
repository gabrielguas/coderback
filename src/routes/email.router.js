import { Router } from "express";
import { sendEmailToResetPassword,resetPassword } from "../config/mailer.config.js"; // sacar esto al controller

const router = Router();
router.post("/send-email-to-reset", sendEmailToResetPassword);
router.get('/reset-password/:token', resetPassword);
export default router;
