const { Schema } = require('mongoose');
const categorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    {
        collection: 'categories',
        timestamps: true,
    },
);

module.exports = categorySchema;

