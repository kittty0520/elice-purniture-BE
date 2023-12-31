const { Schema } = require('mongoose');
const productSchema = new Schema(
    
    {
        productName: {
            type: String,
            required: true,
            unique: true,
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
            required: false,
        },
    },
    {
        collection: 'products',
        timestamps: true,
    },
);

module.exports = productSchema;
