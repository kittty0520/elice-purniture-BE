const jwt = require('jsonwebtoken');

// .env에 저장된 환경변수를 불러오는 모듈
require('dotenv').config();

const secretKey = process.env.SECRET || 'secret-Key';

// 사용자에게 jwt 토큰을 발급함, 유효시간은  2시간으로 설정
const sign = (user) => {
    try {
        const payload = {
            userId: user.userId,
            role: user.role,
        };
        const option = {
            algorithm: 'HS256',
            // expiresIn: '2h',
        };
        return jwt.sign(payload, secretKey, option);
    } catch (err) {
        res.status(400).json({
            result: 'fail-tokenSign',
            reason: '토큰 발행에 실패했습니다.',
        });
    }
};

// 사용자의 토큰을 검증함
const verify = (userToken, res) => {
    return jwt.verify(userToken, secretKey, (error, decoded) => {
        // if (error.message === 'jwt expired') {
        //     console.log(err.message);
        //     res.status(401).json({
        //         result: 'fail-approach',
        //         reason: '만료된 토큰입니다. 다시 로그인 해주세요.',
        //     });
        // } else if (error) {
        //     console.log('invalid token');
        //     res.status(401).json({
        //         result: 'forbidden-approach',
        //         reason: '잘못된 토큰입니다.',
        //     });
        // }
        if (error) {
            res.status(401).json({
                result: 'forbidden-approach',
                reason: '잘못된 토큰입니다.',
            });
        }
        return { userId: decoded.userId, role: decoded.role };
    });
};

module.exports = {
    sign,
    verify,
};
