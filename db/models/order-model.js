import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';

const Order = model('orders', OrderSchema);

export class OrderModel {
    async findById(orderId) {
        const order = await Order.findOne({ _id: orderId });
        return order;
    }

    async findAllByUserId(userId) {
        const orders = await Order.find({ userId });
        return orders;
    }

    async create(orderInfo) {
        const createdNewOrder = await Order.create(orderInfo);
        return createdNewOrder;
    }

    async findAll() {
        const orders = await Order.find({});
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

export { orderModel };
