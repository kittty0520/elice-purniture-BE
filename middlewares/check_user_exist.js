const userModel = require('../db/models/user_model');
module.exports = async ({ userId, method }) => {
    let user = null;
    if (method === 'email') {
        user = await userModel.findByEmail(email);
    } else if (method === 'id') {
        user = await userModel.findById(userId);
    }

    if (!user) {
        const ErrorInfo =
            method === 'email'
                ? '해당 이메일은 존재하지 않습니다.'
                : '사용자 정보를 찾을 수 없습니다.';
        throw new Error(ErrorInfo);
    }

    return user;
};
