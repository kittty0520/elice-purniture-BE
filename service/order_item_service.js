const orderItemModel = require('../db/models/order_item_model');

class OrderItemService {
    constructor(orderItemModel) {
        this.orderItemModel = orderItemModel;
    }

    async addItem(orderItemInfo) {
        // db에 저장
        const createdNewOrderItem = await this.orderItemModel.create(
            orderItemInfo,
        );

        return createdNewOrderItem;
    }

    async getItems() {
        const orderItems = await this.orderItemModel.findAll();

        return orderItems;
    }

    async getItemsByOrderId(orderId) {
        const orderItems = await this.orderItemModel.findAllByOrderId(orderId);

        const simplifiedOrderItems = orderItems.map((item) => ({
            ordersItemId: item._id,
            orderId: {
                orderId: item.orderId._id,
                totalPrice: item.orderId.totalPrice,
                status: item.orderId.status,
            },
            productName: item.productName,
            quantity: item.quantity,
            finalPrice: item.totalPrice,
            createdAt: item.createdAt,
        }));

        return simplifiedOrderItems;
    }

    async getItemsByProductId(productId) {
        const orderItems = await this.orderItemModel.findAllByProductId(
            productId,
        );

        return orderItems;
    }

    async setItem(orderItemId, toUpdate) {
        const updatedOrderItem = await this.orderItemModel.update({
            orderItemId,
            update: toUpdate,
        });

        return updatedOrderItem;
    }

    async getItemData(orderItemId) {
        const orderItem = await this.orderItemModel.findById(orderItemId);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!orderItem) {
            throw new Error(
                '해당 id의 주문아이템은 없습니다. 다시 한 번 확인해 주세요.',
            );
        }

        return orderItem;
    }

    async deleteItemData(orderItemId) {
        const { deletedCount } = await this.orderItemModel.deleteById(
            orderItemId,
        );

        // 삭제에 실패한 경우, 에러 메시지 반환
        if (deletedCount === 0) {
            throw new Error(`${orderItemId} 주문의 삭제에 실패하였습니다`);
        }

        return { result: 'success' };
    }

    async deleteByOrderId(orderId) {
        try {
            // 해당 orderId를 참조하는 OrderItem들을 삭제합니다.
            const result = await this.orderItemModel.deleteMany({ orderId });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

const orderItemService = new OrderItemService(orderItemModel);

module.exports = orderItemService;
