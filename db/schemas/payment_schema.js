const { Schema } = require('mongoose');

const paymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        productName: {
            type: String,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        finalAmount: {
            type: Number,
            required: true,
        },
    },
    {
        collection: 'payments',
        timestamps: true,
    },
);

module.exports = paymentSchema;
