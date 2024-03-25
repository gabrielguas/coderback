import express from 'express';
import userController from '../controllers/userController.js'
import hasPermissions from '../middlewares/hasPermissions.middleware.js';

const router = express.Router();

// Rutas para las vistas de usuarios
router.get('/login', userController.showLoginPage);
router.get('/register', userController.showRegisterPage);
router.get('/chat',hasPermissions("usuario"), userController.showChatPage);
router.get('/',hasPermissions("usuario"), userController.showProfilePage);
router.get('/:userId/cart', hasPermissions("usuario", "premium"), userController.showCartPage);
router.get('/agregarproduct/premium', hasPermissions("premium"), userController.showAddProduct);
export default router;