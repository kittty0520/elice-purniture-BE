const categoryModel = require('../db/models/category_model');
const productModel = require('../db/models/product_model');

class InsertManyService {
    constructor(categoryModel, productModel) {
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }

    async addManyCategoies(categoriesArray) {
        const createdNewCategory = await this.categoryModel.insertMany(
            categoriesArray,
        );
        return createdNewCategory;
    }
    async addManyProducts(productsArray) {
        const createdNewCategory = await this.productModel.insertMany(
            productsArray,
        );
        return createdNewCategory;
    }
}

const insertManyService = new InsertManyService(categoryModel, productModel);
module.exports = insertManyService;
