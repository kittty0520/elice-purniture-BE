const jwt = require('jsonwebtoken');

// .env에 저장된 환경변수를 불러오는 모듈
require('dotenv').config();

const secretKey = process.env.SECRET || 'secret-Key';

module.exports = (req, res, next) => {
    // request 헤더로부터 { authorization: 'Bearer jwt-token' }을 받음
    const userToken = req.headers.authorization.split(' ')[1];

    // 토근이 없을 때 HTTP 401응답
    if (!userToken || userToken === 'null') {
        console.log('authorization 토큰이 없음');

        res.status(401).json({
            result: 'forbidden-approach',
            reason: '로그인한 유저만 접근할 수 있습니다.',
        });
    }

    // 토큰 검증하기
    const decodedJwt = null;
    try {
        decodedJwt = jwt.verify(userToken, secretKey);

        const { userId } = decodedJwt;

        // 미들웨어 다음 순서로 실행될 콜백함수에서 사용할 userId
        req.currentUserId = userId;

        next();
    } catch (err) {
        res.status(401).json({
            result: 'forbidden-approach',
            reason: '유효하지 않은 토근입니다.',
        });
    }
};
