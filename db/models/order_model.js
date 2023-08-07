const { model } = require('mongoose');
const OrderSchema = require('../schemas/order_schema');

const Order = model('orders', OrderSchema);

class OrderModel {
    constructor() {
        this.orderProjection = { updatedAt: 0, __v: 0 };
        this.userPopulateOption = {
            password: 0,
            email: 0,
            role: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
        };
    }
    async findById(orderId) {
        const order = await Order.findOne(
            { _id: orderId },
            this.orderProjection,
        ).populate('user', this.userPopulateOption);
        return order;
    }

    async findAllByUserId(userId) {
        const orders = await Order.find(
            { user: userId },
            this.orderProjection,
        ).populate('user', this.userPopulateOption);
        return orders;
    }

    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    async findAll() {
        const orders = await Order.find({}, this.orderProjection).populate(
            'user',
            this.userPopulateOption,
        );
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
    
    async deleteOne(filter) {
        const result = await Order.deleteOne(filter);
        return result;
    }
}

const orderModel = new OrderModel();

module.exports = orderModel;
