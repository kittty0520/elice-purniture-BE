const { Router } = require('express');
const insertManyService = require('../service/insertMany_service');
const insertManyRouter = Router();
const onlyAdmin = require('../middlewares/admin_only');

insertManyRouter.post('/addcategories', onlyAdmin, async (req, res, next) => {
    try {
        const titlesArray = req.body.titlesArray;

        if (titlesArray) {
            const newCategories = await insertManyService.addManyCategoies(
                titlesArray,
            );
            res.status(201).json(newCategories);
        }
    } catch (error) {
        next(error);
    }
});
insertManyRouter.post('/addproducts', onlyAdmin, async (req, res, next) => {
    try {
        const productsArray = req.body.productsArray;

        if (productsArray) {
            const newProducts = await insertManyService.addManyProducts(
                productsArray,
            );
            res.status(201).json(newProducts);
        }
    } catch (error) {
        next(error);
    }
});

module.exports = insertManyRouter;
