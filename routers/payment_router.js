const express = require('express');
const paymentRouter = express.Router();
const loginRequired = require('../middlewares/login_required');
const adminOnly = require('../middlewares/admin_only');
const PaymentService = require('../service/payment_service');

// 결제 생성
paymentRouter.post('/payment', loginRequired, async (req, res) => {
    try {
        const {
            userId,
            productName,
            totalPrice,
            paymentMethod,
            finalAmount,
            // 기타 결제 관련 필드들...
        } = req.body;

        // 결제 생성을 위한 데이터
        const paymentData = {
            userId,
            productName,
            totalPrice,
            paymentMethod,
            finalAmount,
            // 기타 결제 관련 필드들...
        };

        // 결제 생성 서비스 호출
        const createdPayment = await PaymentService.createPayment(paymentData);

        res.status(201).json(createdPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 결제 조회
paymentRouter.get('/payment/:paymentId', loginRequired, async (req, res) => {
    try {
        const paymentId = req.params.paymentId;
        const foundPayment = await PaymentService.getPayment(paymentId);

        if (!foundPayment) {
            return res.status(404).json({ error: '결제를 찾을 수 없습니다.' });
        }

        res.json(foundPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = paymentRouter;
