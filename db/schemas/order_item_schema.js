const { Schema } = require('mongoose');
const orderItemSchema = new Schema(
    {
        orderId: {
            type: Schema.Types.ObjectId,
            ref: 'orders',
            required: true,
          },
          productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
          },
        productName: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: '주문완료',
        },
    },
    {
        collection: 'order-items',
        timestamps: true,
    },
);

module.exports = orderItemSchema;

