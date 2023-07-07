// eslint-disable-next-line import/no-extraneous-dependencies
import { Schema } from 'mongoose';

const ProductSchema = new Schema(
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
            ref: 'categorys',
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        ProductImageKey: {
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

// eslint-disable-next-line import/prefer-default-export
export { ProductSchema };
