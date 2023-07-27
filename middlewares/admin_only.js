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

    // 관리자의 토큰인지를 검증하기
    try {
        const { role } = jwt.verify(userToken, res);

        // 관리자가 아닐때 HTTP403에러 응답
        if (role !== 'admin') {
            console.log('관리자 토큰이 아닙니다.');
            res.status(403).json({
                result: 'forbidden-approach',
                reason: '관리자만 접근할 수 있습니다.',
            });
            return;
        }
        next();
    } catch (err) {
        next(err);
    }
};
