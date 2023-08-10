const searchModel = require('../db/models/search_model');

// TODO: 실행되는지 확인 후 productService에 합치기
class SearchService {
    constructor(searchModel) {
        this.searchModel = searchModel;
    }
    
}

const searchService = new SearchService(searchModel);

module.exports = searchService;
