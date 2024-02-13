// viewRouter.js

import express from "express";
import viewController from "../controllers/viewController.js"

const router = express.Router();

// Ruta para la página de inicio "/"
router.get("/", viewController.renderIndexPage);

export default router;
