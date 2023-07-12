const categoryModel = require('../db/models/category_model');
const productModel = require('../db/models/product_model');

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }
  async addProduct(productInfo) {
    const createdNewProduct = await this.productModel.create(productInfo);
    
    return createdNewProduct;
  }

  async getProducts() {
    const products = await this.productModel.findAll();

    return products;
  }

  async getProductsByCategoryTitle(categoryTitle) {
    const category = await this.categoryModel.findByTitle(categoryTitle);
    const products = await this.productModel.findAllByCategoryId(category._id);
    
    return products;
  }

  async setProduct(productId, toUpdate) {
    const updatedProduct = await this.productModel.update({
      productId,
      update: toUpdate,
    });

    return updatedProduct;
  }

  async getProductData(productId) {
    const product = await this.productModel.findById(productId);

    if (!product) {
      throw new Error("해당 id의 제품은 없습니다. 다시 한 번 확인해 주세요.");
    }

    return product;
  }

  async deleteProductData(productId) {
    const deletedCount  = await this.productModel.deleteById(productId);

    if (deletedCount === 0) {
      throw new Error(`${productId} 제품의 삭제에 실패하였습니다`);
    }

    return { result: "success" };
  }
}
// const deleteProduct

const productService = new ProductService(productModel, categoryModel);

module.exports = productService;

