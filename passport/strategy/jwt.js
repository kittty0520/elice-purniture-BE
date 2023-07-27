const passport = require('passport');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const isUserExist = require('../../middlewares/check_user_exist');
const userModel = require('../../db/models/user_model');
const opts = {
    secretOrKey: process.env.SECRET || 'secret-Key',
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
async function findUser(userId) {
    const user = await userModel.findById({ userId });
    if (!user) {
        throw new Error('해당 아이디는 존재하지 않습니다.');
    }
    return user;
}
// TODO:로그인을 요구하는 미들웨어로 쓰기? 아님 삭제하기
module.exports = () => {
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, done) => {
            try {
                const userId = jwt_payload.userId;
                const user = await findUser(userId);
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }),
    );
};
