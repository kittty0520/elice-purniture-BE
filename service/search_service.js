const categoryModel = require('../db/models/category_model').categoryModel;
const productModel = require('../db/models/product_model').productModel;

// TODO: 실행되는지 확인 후 productService에 합치기
class SearchService {
    constructor(categoryModel, productModel) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }
    async getProductsByKeyword(keyword) {
        const products = await this.productModel.findAllBykeyword(keyword);

        return products;
    }
}

const searchService = new SearchService(productModel);

module.exports = searchService;
