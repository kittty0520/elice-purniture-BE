const { Router } = require('express');
const searchService = require('../service/search_service');
const searchRouter = Router();

// TODO: 실행되는지 확인 후 productRouter에 합치기
searchRouter.get('/search/products', async (req, res, next) => {
    try {
        const searchKeyword = req.query.keyword;
        const searchProducts = await searchService.getProductsByKeyword(
            searchKeyword,
        );

        res.status(200).json(searchProducts);
    } catch (err) {
        next(err);
    }
});

module.exports = searchRouter;
