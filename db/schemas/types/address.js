const { Schema } = require('mongoose');

const address = {
    type: {
        postalCode: String,
        address1: String,
        address2: String,
    },

    required: false,
};
module.exports = address;
