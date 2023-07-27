const { Schema } = require('mongoose');
const address = require('./types/address');
const userSchema = new Schema(
    {
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
        address,
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

module.exports = userSchema;
