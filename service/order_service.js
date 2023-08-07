const orderModel = require('../db/models/order_model');
const orderItemService = require('./order_item_service');

class OrderService {
    constructor(orderModel, orderItemService) {
        this.orderModel = orderModel;
        this.orderItemService = orderItemService;
    }


    async addOrder(orderInfo) {
        // db에 저장
        const createdNewOrder = await this.orderModel.create(orderInfo);

        return createdNewOrder;
    }

    async getOrders() {
        const orders = await this.orderModel.findAll();

        return orders;
    }

    async getOrdersByUserId(userId) {
        const orders = await this.orderModel.findAllByUserId(userId);

        return orders;
    }

    async setOrder(orderId, toUpdate) {
        const updatedOrder = await this.orderModel.update({
            orderId,
            update: toUpdate,
        });

        return updatedOrder;
    }

    async getOrderData(orderId) {
        const order = await this.orderModel.findById(orderId);

        if (!order) {
            throw new Error(
                '해당 id의 주문은 없습니다. 다시 한 번 확인해 주세요.',
            );
        }

        return order;
    }

    async deleteOrderData(orderId) {
        try {
            // 해당 orderId를 참조하는 OrderItem들을 먼저 삭제합니다.
            await this.orderItemService.deleteByOrderId(orderId);

            // 주문을 삭제합니다.
            const { deletedCount } = await this.orderModel.deleteOne({ _id: orderId });

            if (deletedCount === 0) {
                throw new Error(`${orderId} 주문의 삭제에 실패하였습니다`);
            }

            return { result: 'success' };
        } catch (error) {
            throw error;
        }
    }
}

const orderService = new OrderService(orderModel, orderItemService);

module.exports = orderService;
