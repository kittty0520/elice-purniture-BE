const { Schema } = require('mongoose');
const address = require('./types/address');

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
        address: {
            ...address,
            require: true,
        },
    },
    {
        collection: 'orders',
        timestamps: true,
    },
);
module.exports = orderSchema;
