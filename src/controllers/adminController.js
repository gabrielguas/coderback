// adminController.js
import ProductRepository from "../repositories/productRepository.js";

const productRepository = new ProductRepository();

const adminController = {
  showAdminPanel: async (req, res) => {
    try {
      const products = await productRepository.getAllProducts();
      res.render('adminpanel', { products });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleAddProduct: async (req, res) => {
    try {
      const newProduct = req.body; // Suponiendo que los datos del producto se envían en el cuerpo de la solicitud
      await productRepository.createProduct(newProduct);
      res.redirect('/admin/panel');
    } catch (error) {
      console.error("Error al agregar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleEditProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      const updatedProduct = req.body; // Suponiendo que los datos actualizados del producto se envían en el cuerpo de la solicitud
      await productRepository.updateProduct(productId, updatedProduct);
      res.redirect('/admin/panel');
    } catch (error) {
      console.error("Error al editar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  },

  handleDeleteProduct: async (req, res) => {
    try {
      const productId = req.params.productId;
      await productRepository.deleteProduct(productId);
      res.redirect('/admin/panel');
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      res.status(500).send("Error interno del servidor");
    }
  }
};

export default adminController;
