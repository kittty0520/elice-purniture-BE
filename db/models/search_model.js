const { model } = require('mongoose');
const ProductSchema = require('../schemas/product_schema');

const Product = model('products', ProductSchema);

// TODO: 실행되는 지 확인 후 productModel에 합치기
class SearchModel {
    constructor() {
        this.productProjection = { __v: 0 };
        this.categoryPopulateOption = {
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        };
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

const searchModel = new SearchModel();

module.exports = searchModel;
