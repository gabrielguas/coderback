import ProductDao  from "../Dao/DBManager/product.dao.js"

class ProductRepository {
  constructor() {
    this.productDAO = new ProductDao();
  }

  async getAllProducts() {
    try {
      return await this.productDAO.getAllProducts();
    } catch (error) {
      throw error;
    }
  }

  async getAllProductsPaginate(req,res) {
    try {
      return await this.productDAO.getAllProductsPaginate(req,res);
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await this.productDAO.getProductById(id);
    } catch (error) {
      throw error;
    }
  }

  async createProduct(product) {
    try {
      return await this.productDAO.createProduct(product);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, product) {
    try {
      return await this.productDAO.updateProduct(id, product);
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      console.log("Producto eliminado");
      return await this.productDAO.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }
}

export default ProductRepository;
