const { model } = require('mongoose');
const ProductSchema = require('../schemas/product_schema');

const Product = model('products', ProductSchema);

class ProductModel {
    async findByTitle(title) {
        const product = await Product.findOne({ productName: title }).populate(
            'categoryId',
        );
        return product;
    }

    async findById(productId) {
        const product = await Product.findOne({ _id: productId }).populate(
            'categoryId',
        );
        return product;
    }

    async findOneByCategoryId(categoryId) {
        const product = await Product.findOne({ categoryId }).populate(
            'categoryId',
        );
        return product;
    }

    async findAllByCategoryId(categoryId) {
        const products = await Product.find({ categoryId }).populate(
            'categoryId',
        );
        return products;
    }

    async create(productInfo) {
        const createdNewProduct = await Product.create(productInfo);
        return createdNewProduct;
    }
    async insertMany(productsArray) {
        const createdNewProducts = await Product.insertMany(productsArray);
        return createdNewProducts;
    }

    async findAll() {
        const products = await Product.find({}).populate('categoryId');
        return products;
    }

    async update({ productId, update }) {
        const filter = { _id: productId };
        const option = { returnOriginal: false };

        const updatedProduct = await Product.findOneAndUpdate(
            filter,
            update,
            option,
        );
        return updatedProduct;
    }

    async deleteById(productId) {
        const result = await Product.deleteOne({ _id: productId });
        return result;
    }
}

const productModel = new ProductModel();

module.exports = productModel;
