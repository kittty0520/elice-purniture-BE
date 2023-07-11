const { model } = require('mongoose');
const ProductSchema = require('../schemas/product_schema');

const Product = model('products', ProductSchema);

// TODO: 실행되는 지 확인 후 productModel에 합치기
class SearchModel {
    async findAllBykeyword(keyword) {
        // 정규표현식을 사용해서 searchKeywords 배열에 포함된 문자열 중 keyword를 포함하는 문자열을 검색하기
        const products = await Product.find({
            searchKeywords: { $elemMatch: { $regex: keyword, $options: 'i' } },
        }).populate('categoryId');
        return products;
    }
}

const searchModel = new SearchModel();

module.exports = searchModel;
