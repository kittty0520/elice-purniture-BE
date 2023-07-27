const { Schema } = require('mongoose');

const address = {
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
    required: false,
};
module.exports = address;
