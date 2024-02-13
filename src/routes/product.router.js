import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.createProduct);
router.get("/:ID", productController.getProductById);
router.put("/:ID", productController.updateProduct);
router.delete("/:ID", productController.deleteProduct);
router.get("/detalle/:ID", productController.getProductDetailById);

export default router;