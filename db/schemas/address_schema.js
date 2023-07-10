const { Schema } = require('mongoose');

const addressSchema = new Schema(
    {
        postalCode: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'addresses',
    },
);

module.exports = addressSchema;
