import { Schema } from 'mongoose';

const OrderSchema = new Schema(
    {
        userNumber: {
            type: Number,
            ref: 'users',
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
        },
        address: {
            type: new Schema(
                {
                    postalCode: String,
                    address1: String,
                    address2: String,
                    fullName: String,
                },
                {
                    _id: false,
                },
            ),
            required: true,
        },
        orderDate: {
            type: Date,
            required: true,
        },
    },
    {
        collection: 'orders',
        timestamps: true,
    },
);
export { OrderSchema };
