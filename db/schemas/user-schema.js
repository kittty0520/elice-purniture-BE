const { Schema } = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const addressSchema = require("./addressSchema");

const userSchema = new Schema(
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
            type: addressSchema,
            required: true
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
userSchema.plugin(AutoIncrement, { inc_field: 'userNumber' });
module.exports = userSchema;
