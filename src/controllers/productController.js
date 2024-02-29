import ProductRepository from "../repositories/productRepository.js"

const productRepository = new ProductRepository();

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productRepository.getAllProductsPaginate(req,res);
      return (products)
    } catch (error) {
      console.error("Error al obtener todos los productos:", error);
      res.status(500).json({ error: "Error al obtener productos" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = req.body;
      const createdProduct = await productRepository.createProduct(product);
      console.log("Producto creado con éxito:", createdProduct);
      console.log("Datos del producto:", product);
      res.status(201).json(createdProduct);
    } catch (error) {
      console.error("Error al crear el producto:", error.message);
      res.status(500).json({ error: "Error al crear el producto" });
    }
  },

  getProductById: async (req, res) => {
    const { ID } = req.params;
    try {
      const product = await productRepository.getProductById(ID);
      res.json(product);
    } catch (error) {
      console.log("Error al buscar el producto por ID");
      console.log(error);
      res.status(500).json({ error: "Error al buscar el producto por ID" });
    }
  },

  updateProduct: async (req, res) => {
    const { ID } = req.params;
    const data = req.body;

    try {
      const product = await productRepository.updateProduct(ID, data);
      if (product) {
        res.json({
          message: "Producto actualizado con exito",
        });
      } else {
        res.json({
          message: "No se pudo actualizar el producto",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error al actualizar el producto" });
    }
  },

  deleteProduct: async (req, res) => {
    const { ID } = req.params;
    try {
      const product = await productRepository.deleteProduct(ID);
      if (product) {
        res.json({
          message: "Producto eliminado con exito",
        });
      } else {
        res.status(404).json({
          message: "No se encontró el producto en la base de datos",
        });
      }
    } catch (error) {
      console.log("Error al eliminar el producto");
      console.log(error);
      res.status(500).json({ error: "Error al eliminar el producto" });
    }
  },

  getProductDetailById: async (req, res) => {
    const { ID } = req.params;

    try {
      const product = await productRepository.getProductById(ID);
      res.json(product);
    } catch (error) {
      console.log("Error al buscar el producto por ID");
      console.log(error);
      res.status(500).json({ error: "Error al buscar el producto por ID" });
    }
  },
};

export default productController;
