import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
    {
        orderDetailNumber: {
            type: Number,
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
            required: false,
            default: '상품 준비중',
        },
    },
    {
        collection: 'order-items',
        timestamps: true,
    },
);

export { OrderItemSchema };
