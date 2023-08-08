const { model } = require('mongoose');
const OrderItemSchema = require('../schemas/order_item_schema');
const Order = require('./order_model');

const OrderItem = model('order_items', OrderItemSchema);

class OrderItemModel {
    async findById(orderItemId) {
        const orderItem = await OrderItem.findOne({ _id: orderItemId })
            .populate('orderId')
            .populate('productId');
        return orderItem;
    }

    async findAllByOrderId(orderId) {
        const orderItems = await OrderItem.find({ orderId })
            .populate('orderId')
            .populate('productId');
        return orderItems;
    }

    async findAllByProductId(productId) {
        const orderItems = await OrderItem.find({ productId })
            .populate('orderId')
            .populate('productId');
        return orderItems;
    }

    async create(orderItemInfo) {
        const createdNewOrderItem = await OrderItem.create(orderItemInfo);
        return createdNewOrderItem;
    }

    async findAll() {
        const orderItems = await OrderItem.find({})
            .populate('orderId')
            .populate('productId');
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

    async deleteByIdAndRelatedData(orderItemId) {
        try {
            // 해당 orderItemId로 주문 아이템 정보를 가져옵니다.
            const orderItem = await OrderItem.findById(orderItemId);
            if (!orderItem) {
                throw new Error(
                    '해당 id의 주문아이템은 없습니다. 다시 한 번 확인해 주세요.',
                );
            }

            const orderId = orderItem.orderId;

            // 해당 orderId를 참조하는 OrderItem들을 삭제합니다.
            await OrderItem.deleteMany({ orderId });

            // 주문을 삭제합니다.
            await Order.deleteOne({ _id: orderId });

            // 주문 아이템을 삭제합니다.
            // const { deletedCount } = await OrderItem.deleteOne({
            //     _id: orderItemId,
            // });

            // if (deletedCount === 0) {
            //     throw new Error(`${orderItemId} 주문의 삭제에 실패하였습니다`);
            // }

            return { result: 'success' };
        } catch (error) {
            throw error;
        }
    }

    async deleteByOrderId(orderId) {
        const result = await OrderItem.deleteMany({ orderId });
        return result;
    }

    async deleteMany(filter) {
        const result = await OrderItem.deleteMany(filter);
        return result;
    }

    async deleteOne(filter) {
        const result = await OrderItem.deleteOne(filter);
        return result;
    }
}

const orderItemModel = new OrderItemModel();

module.exports = orderItemModel;
