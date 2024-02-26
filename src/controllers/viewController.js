import productController from "./productController.js";

const viewController = {
  renderIndexPage: async (req, res) => {
    try {
      // Obtener todos los productos
      const products = await productController.getAllProducts(req, res);

      // Verificar si el usuario está autenticado
      const user = req.session.user || null;
      // Obtener el userId del objeto user
      const userId = user ? user._id : null;
      console.log("UserID: ", userId);
      // Renderizar la vista index con los datos necesarios
      res.render("index", { user: user, userId: userId, products: products });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      res.status(500).send("Error al obtener los productos");
    }
  },
};

export default viewController;

