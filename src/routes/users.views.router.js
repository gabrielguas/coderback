import express from 'express';
import userController from '../controllers/userController.js'

const router = express.Router();

// Rutas para las vistas de usuarios
router.get('/login', userController.showLoginPage);
router.get('/register', userController.showRegisterPage);
router.get('/', userController.showProfilePage);
router.get('/:userId/cart', userController.showCartPage);
export default router;