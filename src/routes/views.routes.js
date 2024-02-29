import express from 'express';
import viewController from '../controllers/viewController.js';
import adminController from '../controllers/adminController.js';
import hasPermissions from '../middlewares/hasPermissions.middleware.js';

const router = express.Router();

// Ruta para la página de inicio "/"
router.get("/", (req, res) => {
  // Verifica si el usuario tiene permisos de administrador
  if (req.session && req.session.user && req.session.user.rol === "admin") {
    // Si es administrador, redirige al panel de administrador
    res.redirect("/admin");
  } else {
    // Si es usuario normal, renderiza la página de inicio
    viewController.renderIndexPage(req, res);
  }
});

// Ruta para el panel de administrador
router.get("/admin", hasPermissions("admin"), adminController.showAdminPanel);

export default router;
