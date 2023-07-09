const { Schema } = require('mongoose');

const productSchema = new Schema(
    {
        productNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        productName: {
            type: String,
            required: true,
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            ref: 'categories',
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        productImageKey: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        searchKeywords: {
            type: [String],
            required: true,
        },
        productDate: {
            type: Date,
            required: true,
        },
    },
    {
        collection: 'products',
        timestamps: true,
    },
);

module.exports = productSchema;

