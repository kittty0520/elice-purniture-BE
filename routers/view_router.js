const express = require('express');
const path = require('path');

const viewsRouter = express.Router();

// views폴더 내의 html 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
const serveStatic = (resource) => {
    let dirName = '';
    if (resource === 'index') {
        dirName = '../view';
    } else {
        dirName = '../view/html';
    }
    const resourcePath = path.join(__dirname, dirName);
    const option = { index: `${resource}.html` };

    return express.static(resourcePath, option);
};

// 페이지별로 html, css, js 파일들 라우팅
viewsRouter.use('/', serveStatic('index'));
viewsRouter.use('/account', serveStatic('login_account_management'));
viewsRouter.use('/login', serveStatic('login'));
viewsRouter.use('/register', serveStatic('login_register'));
viewsRouter.use('/category', serveStatic('category'));
viewsRouter.use('/products', serveStatic('detail'));
viewsRouter.use('/cart', serveStatic('cart'));
viewsRouter.use('/orderslist', serveStatic('order'));
viewsRouter.use('/orderslist', serveStatic('order_tracking'));
viewsRouter.use('/admin', serveStatic('admin'));
viewsRouter.use('/products', serveStatic('manage_goods'));
viewsRouter.use('/users', serveStatic('manage_user'));
viewsRouter.use('/admin/orderslist', serveStatic('manage_order'));
// viewsRouter.use('/page-not-found', serveStatic('page-not-found'));

// views 폴더의 최상단 파일 (사진, favicon 등) 라우팅
viewsRouter.use('/', serveStatic(''));

module.exports = viewsRouter;
