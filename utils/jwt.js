const jwt = require('jsonwebtoken');

// .env에 저장된 환경변수를 불러오는 모듈
require('dotenv').config();

const secretKey = process.env.SECRET || 'secret-Key';

const sign = (user) => {
    const payload = {
        userId: user.email,
        role: user.role,
    };

    return jwt.sign(payload, secretKey);
};

const verify = (userToken) => {
    const decoded = null;
    try {
        decoded = jwt.verify(userToken, secretKey);

        return { userId: decoded.userId, role: decoded.role };
    } catch (err) {
        throw new Error();
    }
};

module.exports = {
    sign,
    verify,
};
