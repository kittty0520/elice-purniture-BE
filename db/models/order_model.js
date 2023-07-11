const { model } = require('mongoose');
const OrderSchema = require('../schemas/order_schema');

const Order = model('orders', OrderSchema);

class OrderModel {
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId }).populate('user');
        return order;
    }

    async findAllByUserId(userId) {
        const orders = await Order.find({ user: userId }).populate('user');
        return orders;
    }

    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    async findAll() {
        const orders = await Order.find({}).populate('user');
        return orders;
    }

    async update({ orderId, update }) {
        const filter = { _id: orderId };
        const option = { returnOriginal: false };

        const updatedOrder = await Order.findOneAndUpdate(
            filter,
            update,
            option,
        );
        return updatedOrder;
    }

    async deleteById(orderId) {
        const result = await Order.deleteOne({ _id: orderId });
        return result;
    }
}

const orderModel = new OrderModel();

module.exports = orderModel;
