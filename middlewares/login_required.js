const jwt = require('../utils/jwt');

module.exports = (req, res, next) => {
    // request 헤더로부터 { authorization: 'Bearer jwt-token' }을 받음
    const auth = req.headers.authorization;
    const userToken = auth?.split(' ')[1];

    // 토근이 없을 때 HTTP 401응답
    if (!userToken || userToken === 'null') {
        console.log('authorization 토큰이 없음');

        res.status(401).json({
            result: 'fail-authentication',
            reason: '로그인한 유저만 접근할 수 있습니다.',
        });
        return;
    }

    // 토큰 검증하기

    try {
        const { userId } = jwt.verify(userToken, res);

        // 미들웨어 다음 순서로 실행될 콜백함수에서 사용할 userId
        req.currentUserId = userId;
        next();
    } catch (err) {
        next(err);
    }
};
