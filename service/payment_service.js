const paymentModel = require('../db/models/payment_model');
const User = require('../db/models/user_model');

class PaymentService {
    // 결제 생성
    async createPayment(paymentData) {
        try {
            const newPayment = new paymentModel(paymentData);
            return await newPayment.save();
        } catch (error) {
            throw new Error('결제 생성 실패');
        }
    }

    // 결제 조회
    async getPayment(paymentId) {
        try {
            const foundPayment = await paymentModel.findById(paymentId);

            if (!foundPayment) {
                throw new Error('결제를 찾을 수 없습니다.');
            }

            // 결제 정보에서 user 필드에 해당하는 사용자 정보를 가져옵니다.
            const user = await User.findById(
                foundPayment.userId,
                'email fullName',
            );

            // 결제 정보와 사용자 정보를 합쳐서 반환합니다.
            const paymentWithUser = {
                ...foundPayment.toObject(),
                user: {
                    email: user.email,
                    fullName: user.fullName,
                },
            };

            return paymentWithUser;
        } catch (error) {
            throw new Error('결제 조회 실패');
        }
    }
}

module.exports = new PaymentService();
