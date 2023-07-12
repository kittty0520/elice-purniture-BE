const { Router } = require('express');
const onlyAdmin = require('../middlewares/admin_only');
const categoryService = require('../service/catetory_service');
const categoryRouter = Router();


categoryRouter.post('/categories',
onlyAdmin,
async (req, res, next) => {
  try {
    const title = req.body.title;
    const newCategory = await categoryService.addCategory({
      title,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get('/categories', async function (req, res, next) {
  try {
   
    const categorys = await categoryService.getCategorys();

    res.status(200).json(categorys);
  } catch (error) {
    next(error);
  }
});

// :categoryId 같이 파라미터로 받는다면 ex)"localhost:3000/api/categories/64ad596db8~~~~"
categoryRouter.get(
  '/categories/:categoryId',
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const categoryData = await categoryService.getCategoryDataById(
        categoryId
      );

      res.status(200).json(categoryData);
    } catch (error) {
      next(error);
    }
  }
);


categoryRouter.patch(
  '/categories/:categoryId',
  onlyAdmin,
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const title = req.body.title;
      const toUpdate = {
        ...(title && { title }),
      };
      const updatedCategory = await categoryService.setCategory(
        categoryId,
        toUpdate
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

categoryRouter.delete(
  '/categories/:categoryId',
  onlyAdmin,
  async function (req, res, next) {
    try {
      const categoryId = req.params.categoryId;
      const deleteResult = await categoryService.deleteCategoryData(categoryId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = categoryRouter;
