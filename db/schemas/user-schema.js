import { Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        userNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: false,
        },
        address: {
            type: new Schema(
                {
                    postalCode: String,
                    address1: String,
                    address2: String,
                },
                {
                    _id: false,
                },
            ),
            required: true,
        },
        role: {
            type: String,
            required: false,
            default: 'basic-user',
        },
    },
    {
        collection: 'users',
        timestamps: true,
    },
);

export { UserSchema };
