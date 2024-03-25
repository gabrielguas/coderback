import express from 'express';
import userController from '../controllers/userController.js'

const router = express.Router();

router.get("/premium/:uid",userController.upgradeToPremium);

export default router