const { model } = require('mongoose');
const paymentSchema = require('../schemas/payment_schema');

const Payment = model('Payment', paymentSchema);



module.exports = Payment;
