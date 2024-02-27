import express from 'express';
import adminController from "../controllers/adminController.js";
import hasPermissions from '../middlewares/hasPermissions.middleware.js';

const router = express.Router();
router.get('/', hasPermissions("admin"), adminController.showAdminPanel);
export default router;