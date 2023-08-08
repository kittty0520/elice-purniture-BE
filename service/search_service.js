const searchModel = require('../db/models/search_model');

// TODO: 실행되는지 확인 후 productService에 합치기
class SearchService {
    constructor(searchModel) {
        this.searchModel = searchModel;
    }
    async getProductsByKeyword(keyword) {
        const products = await this.searchModel.findAllBykeyword(keyword);
        return products;
    }
}

const searchService = new SearchService(searchModel);

module.exports = searchService;
