import ProductModel from "../../models/product.model.js";

class ProductDao {
  // Obtener todos los productos

  async getAllProducts() {
    return await ProductModel.find();
  }

  // Obtener todos los productos paginados

  async getAllProductsPaginate(req,res) {
    const { page, limit, query, sort } = req.query;
    let filter = {};
    let sortOption = {};

    if (query) {
      filter = {
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      };
    }

    if (sort) {
      if (sort.toLowerCase() === "asc") {
        sortOption = { price: 1 }; //1 para Ascendente
      } else if (sort.toLowerCase() === "desc") {
        sortOption = { price: -1 }; // -1 para Descendente
      }
    }

    return await ProductModel.paginate(filter, {
      page: page || 1,
      limit: limit || 5,
      sort: sortOption,
    });
  }

  // Obtener un producto por ID

  async getProductById(id) {
    return await ProductModel.findById(id);
  }

  // Crear un producto

  async createProduct(product) {
    return await ProductModel.create(product);
  }

  // Actualizar un producto

  async updateProduct(id, product) {
    return await ProductModel.findByIdAndUpdate(id, product);
  }

  // Eliminar un producto

  async deleteProduct(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default ProductDao; // Exportar la clase ProductDao, no una instancia de ella
