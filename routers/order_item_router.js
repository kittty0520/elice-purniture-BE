const { Router } = require('express');
const loginRequired = require('../middlewares/login_required');
const adminOnly = require('../middlewares/admin_only');
const orderItemService = require('../service/order_item_service');

const orderItemRouter = Router();

orderItemRouter.post('/ordersitem', loginRequired, async (req, res, next) => {
    try {
        // req (request) 에서 데이터 가져오기
        const { orderId, productId, productName, quantity, totalPrice } =
            req.body;

        // 위 데이터를 제품 db에 추가하기
        const newOrderItem = await orderItemService.addItem({
            orderId,
            productId,
            productName,
            quantity,
            totalPrice,
        });
        res.status(201).json(newOrderItem);
    } catch (error) {
        next(error);
    }
});

// 전체 주문아이템 목록은 관리자만 조회 가능함
orderItemRouter.get(
    '/admin/ordersitemlist',
    adminOnly,
    async function (req, res, next) {
        try {
            const orderItems = await orderItemService.getItems();

            res.status(200).json(orderItems);
        } catch (error) {
            next(error);
        }
    },
);

// 특정 유저의 주문아이템 단일 목록 조회
orderItemRouter.get(
    '/ordersitemlist/:orderId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderId = req.params.orderId;
            const orderItems = await orderItemService.getItemsByOrderId(
                orderId,
            );

            res.status(200).json(orderItems);
        } catch (error) {
            next(error);
        }
    },
);

orderItemRouter.patch(
    '/ordersitemlist/:ordersItemId',
    loginRequired,
    async function (req, res, next) {
        try {
            // req (request) 에서 데이터 가져오기
            const ordersItemId = req.params.ordersItemId;
            const quantity = req.body.quantity;
            const totalPrice = req.body.totalPrice;
            const status = req.body.status;

            // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
            // 보내주었다면, 업데이트용 객체에 삽입함.
            const toUpdate = {
                ...(quantity && { quantity }),
                ...(totalPrice && { totalPrice }),
            };

            // 제품 정보를 업데이트함.
            const updatedOrderItem = await orderItemService.setItem(
                ordersItemId,
                toUpdate,
            );

            res.status(200).json(updatedOrderItem);
        } catch (error) {
            next(error);
        }
    },
);

orderItemRouter.delete(
    '/orderitems/:orderItemId',
    loginRequired,
    async function (req, res, next) {
        try {
            const orderItemId = req.params.orderItemId;
            const deleteResult = await orderItemService.deleteItemData(
                orderItemId,
            );

            res.status(200).json(deleteResult);
        } catch (error) {
            next(error);
        }
    },
);

module.exports = orderItemRouter;
