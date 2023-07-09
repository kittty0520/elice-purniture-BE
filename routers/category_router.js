const express = require('express');
const express = require('express');
const { adminOnly, requireLogin } = require('../middlewares');
const { categoryService } = require('../services');

const categoryRouter = express.Router();

categoryRouter.post('/categories', onlyAdmin, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요.'
      );
    }
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

categoryRouter.get(
  '/categories/:categoryId',
  requireLogin,
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
  '/categorys/:categoryId',
  adminOnly,
  async function (req, res, next) {
    try {
      if (Object.keys(req.body).length === 0) {
        throw new Error(
          'headers의 Content-Type을 application/json으로 설정해주세요.'
        );
      }
      const categoryId = req.params.categoryId;
      const title = req.body.title;
      const description = req.body.description;
      const themeClass = req.body.themeClass;
      const imageKey = req.body.imageKey;
      const toUpdate = {
        ...(title && { title }),
        ...(description && { description }),
        ...(imageKey && { imageKey }),
        ...(themeClass && { themeClass }),
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
  'categories/:categoryId',
  loginRequired,
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

export { categoryRouter };
