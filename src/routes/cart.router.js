// cart.router.js

import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

router.post('/:userId/products/:productId', cartController.addToCart);
router.post('/clearcart', cartController.clearCart);
router.post('/checkout', cartController.checkout);
export default router;

