const { model } = require('mongoose');
const ProductSchema = require('../schemas/product_schema');

const Product = model('products', ProductSchema);

class ProductModel {
    constructor() {
        this.productProjection = { __v: 0 };
        this.categoryPopulateOption = {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        };
    }

    async findByTitle(title) {
        const product = await Product.findOne(
            { productName: title },
            this.productProjection,
        );
        return product;
    }

    async findById(productId) {
        const product = await Product.findOne(
            { _id: productId },
            this.productProjection,
        ).populate('categoryId', this.categoryPopulateOption);
        return product;
    }

    async findOneByCategoryId(categoryId) {
        const product = await Product.findOne(
            { categoryId },
            this.productProjection,
        ).populate('categoryId', this.categoryPopulateOption);
        return product;
    }

    async findAllByCategoryId(categoryId) {
        const products = await Product.find(
            { categoryId },
            this.productProjection,
        ).populate('categoryId', this.categoryPopulateOption);
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
        const products = await Product.find(
            {},
            this.productProjection,
        ).populate('categoryId', this.categoryPopulateOption);
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

    async findAllBykeyword(keyword) {
        // 정규표현식을 사용해서 searchKeywords 배열에 포함된 문자열 중 keyword를 포함하는 문자열을 검색하기
        const products = await Product.find(
            {
                $or: [
                    { productName: { $regex: keyword, $options: 'i' } },
                    {
                        shortDescription: { $regex: keyword, $options: 'i' },
                    },
                ],
            },
            this.productProjection,
        ).populate('categoryId', this.categoryPopulateOption);
        return products;
    }
}

const productModel = new ProductModel();

module.exports = productModel;
