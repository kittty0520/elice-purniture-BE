const { Router } = require('express');
const loginRequired = require('../middlewares/login_required');
const adminOnly = require('../middlewares/admin_only');
const orderService = require('../service/order_service');

const orderRouter = Router();

orderRouter.post('/orderslist', loginRequired, async (req, res, next) => {
    try {
        // req (request) 에서 데이터 가져오기
        const userId = req.currentUserId;
        const { totalPrice, status } = req.body;
        // 위 데이터를 제품 db에 추가하기
        const newOrder = await orderService.addOrder({
            user: userId,
            totalPrice,
            status,
        });

        res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
});

// 전체 주문 목록은 관리자만 조회 가능함
orderRouter.get(
    '/admin/orderslist',
    adminOnly,
    async function (req, res, next) {
        try {
            const orders = await orderService.getOrders();

            res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    },
);

// 특정 사용자(현재 로그인한 사용자)의 전체 주문 조회(userId)
orderRouter.get('/orderslist', loginRequired, async function (req, res, next) {
    try {
        const userId = req.currentUserId;

        const orders = await orderService.getOrdersByUserId(userId);

        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
});
// 특정 사용자(현재 로그인한 사용자)의 단일 주문 조회(orderId)
orderRouter.get(
    '/orderslist/:orderId',
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
    '/admin/orderslist/:orderId',
    adminOnly,
    async function (req, res, next) {
        try {
            // req (request) 에서 데이터 가져오기
            const orderId = req.params.orderId;
            const { status } = req.body;
            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = {
                ...(status && { status }),
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
    '/orderslist/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderId = req.params.orderId;
            const orderData = await orderService.getOrderData(orderId);
            const status = orderData.status; // DB에서 status 값 가져오기

            if (status === '주문취소') {
                const deleteResult = await orderService.deleteOrderData(
                    orderId,
                );
                res.status(200).json(deleteResult);
            } else {
                res.status(400).json({
                    message:
                        '주문 취소를 할 수 없습니다. 관리자에게 요청하세요.',
                });
            }
        } catch (error) {
            next(error);
        }
    },
);

module.exports = orderRouter;
