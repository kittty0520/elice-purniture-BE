const { Router } = require('express');
const loginRequired = require('../middlewares/login_required');
const adminOnly = require('../middlewares/admin_only');
const orderService = require('../service/order_service');

const orderRouter = Router();

orderRouter.post('/orders', loginRequired, async (req, res, next) => {
    try {
        // req (request) 에서 데이터 가져오기
        const userId = req.currentUserId;
        const {
            fullName,
            phoneNumber,
            address,
            postalCode,
            productName,
            quanitity,
            totalPrice,
            orderDate,
        } = req.body;

        // 위 데이터를 제품 db에 추가하기
        const newOrder = await orderService.addOrder({
            userId,
            fullName,
            phoneNumber,
            address,
            postalCode,
            productName,
            quanitity,
            totalPrice,
            orderDate,
        });

        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});

// 전체 주문 목록은 관리자만 조회 가능함
orderRouter.get('/orderlist/all', adminOnly, async function (req, res, next) {
    try {
        const orders = await orderService.getOrders();

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});

// 특정 사용자(현재 로그인한 사용자)의 주문 조회
orderRouter.get(
    '/orderlist/user',
    loginRequired,
    async function (req, res, next) {
        try {
            const userId = req.currentUserId;

            const orders = await orderService.getOrdersByUserId(userId);

            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },
);

orderRouter.get(
    '/orders/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderId = req.params.orderId;
            const orderData = await orderService.getOrderData(orderId);

            res.status(200).json(orderData);
        } catch (error) {
            next(error);
        }
    },
);

orderRouter.patch(
    '/orders/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            // req (request) 에서 데이터 가져오기
            const orderId = req.params.orderId;
            const { phonNumber, address, postalCode } = req.body;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = {
                ...(address && { address }),
                ...(phonNumber && { phonNumber }),
                ...(postalCode && { postalCode }),
            };

            // 제품 정보를 업데이트함.
            const updatedOrder = await orderService.setOrder(orderId, toUpdate);

            res.status(200).json(updatedOrder);
        } catch (error) {
            next(error);
        }
    },
);

orderRouter.delete(
    '/orders/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderId = req.params.orderId;
            const deleteResult = await orderService.deleteOrderData(orderId);

            res.status(200).json(deleteResult);
        } catch (error) {
            next(error);
        }
    },
);

module.exports = orderRouter;
