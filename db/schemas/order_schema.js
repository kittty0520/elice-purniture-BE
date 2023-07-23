const { Schema } = require('mongoose');
const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users',
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
        collection: 'orders',
        timestamps: true,
    },
);
module.exports = orderSchema;
