const jwt = require('jsonwebtoken');

// .env에 저장된 환경변수를 불러오는 모듈
require('dotenv').config();

const secretKey = process.env.SECRET || 'secret-Key';

// 사용자에게 jwt 토큰을 발급함
const sign = (user) => {
    const payload = {
        userId: user.email,
        role: user.role,
    };

    return jwt.sign(payload, secretKey);
};

// 사용자의 토큰을 검증함
const verify = (userToken) => {
    let decoded = null;

    try {
        decoded = jwt.verify(userToken, secretKey);

        return { userId: decoded.userId, role: decoded.role };
    } catch (err) {
        res.status(401).json({
            result: 'forbidden-approach',
            reason: '잘못된 토큰입니다.',
        });
    }
};

module.exports = {
    sign,
    verify,
};
