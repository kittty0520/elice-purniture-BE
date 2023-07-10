const model = require('mongoose');
const OrderItemSchema = require('../schemas/order-item-schema');

const OrderItem = model('order-items', OrderItemSchema);

export class OrderItemModel {
    async findById(orderItemId) {
        const orderItem = await OrderItem.findOne({ _id: orderItemId });
        return orderItem;
    }

    async findAllByOrderId(orderId) {
        const orderItems = await OrderItem.find({ orderId });
        return orderItems;
    }

    async findAllByProductId(productId) {
        const orderItems = await OrderItem.find({ productId });
        return orderItems;
    }

    async create(orderItemInfo) {
        const createdNewOrderItem = await OrderItem.create(orderItemInfo);
        return createdNewOrderItem;
    }

    async findAll() {
        const orderItems = await OrderItem.find({});
        return orderItems;
    }

    async update({ orderItemId, update }) {
        const filter = { _id: orderItemId };
        const option = { returnOriginal: false };

        const updatedOrderItem = await OrderItem.findOneAndUpdate(
            filter,
            update,
            option,
        );
        return updatedOrderItem;
    }

    async deleteById(orderItemId) {
        const result = await OrderItem.deleteOne({ _id: orderItemId });
        return result;
    }
}

const orderItemModel = new OrderItemModel();

module.exports = orderItemModel;
