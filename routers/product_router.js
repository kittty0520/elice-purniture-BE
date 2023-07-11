const { Router } = require('express');
const onlyAdmin = require('../middlewares/admin_only');
const productService = require('../service/product_service')
const productRouter = Router();


productRouter.post("/products",
 onlyAdmin,
 async (req, res, next) => {
  try {
    // req (request) 에서 데이터 가져오기

    const productNumber = req.body.productNumber;
    const productName = req.body.productName;
    const categoryId = req.body.categoryId;
    const shortDescription = req.body.shortDescription;
    const productImageKey = req.body.productImageKey;
    const price = req.body.price;
    const searchKeywords = req.body.searchKeywords;

    // 위 데이터를 제품 db에 추가하기
    const newProduct = await productService.addProduct({
      productNumber,
      productName,
      categoryId,
      shortDescription,
      productImageKey,
      price,
      searchKeywords
    });


    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

productRouter.get(
  "/products",
  async function (req, res, next) {
    try {
      const products = await productService.getProducts();

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);
//todo)
productRouter.get(
  "/products/category/:categoryTitle",
  async function (req, res, next) {
    let categoryTitle = req.params.categoryTitle;

    try {
     
      const products = await productService.getProductsByCategoryTitle(
        categoryTitle
      );

      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.get("/products/:productId", async function (req, res, next) {
  try {
    const productId = req.params.productId;
    const productData = await productService.getProductData(productId);

    res.status(200).json(productData);
  } catch (error) {
    next(error);
  }
});

productRouter.patch(
  "/products/:productId",
  onlyAdmin,
  async function (req, res, next) {
    try {  
      const productId = req.params.productId;

      const {
      productNumber,
      productName,
      categoryId,
      shortDescription,
      productImageKey,
      price,
      searchKeywords
    } = req.body;

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      const toUpdate = {
        ...(productNumber && { productNumber }),
        ...(productName && { productName }),
        ...(categoryId && { categoryId }),
        ...(shortDescription && { shortDescription }),
        ...(productImageKey && { productImageKey }),
        ...(price && { price }),
        ...(searchKeywords && { searchKeywords }),
      };

      // 제품 정보를 업데이트함.
      const updatedProduct = await productService.setProduct(
        productId,
        toUpdate
      );

      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

productRouter.delete(
  "/products/:productId",
  onlyAdmin,
  async function (req, res, next) {
    try {
      const productId = req.params.productId;
      const deleteResult = await productService.deleteProductData(productId);

      res.status(200).json(deleteResult);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = productRouter;
