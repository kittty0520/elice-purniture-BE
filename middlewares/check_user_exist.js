const userModel = require('../db/models/user_model');
//TODO : 두개로 분리하기
module.exports = async ({ userInfo, method }) => {
    const { email, userId } = userInfo;
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
