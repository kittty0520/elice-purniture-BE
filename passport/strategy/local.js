const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../../db/models/user_model');
const { matchPassword } = require('../../utils/hash_password');

const config = {
    usernameField: 'email', // 'email' 필드 사용하도록 설정
    passwordField: 'password', // 'password' 필드 사용하도록 설정
};

async function findUserOrMatchPassword({ email, password }) {
    const user = await userModel.findByEmail(email);
    if (!user) {
        throw new Error('해당 이메일은 존재하지 않습니다.');
    }
    // DB에 저장된 비밀번호와 일치하는지 확인하기
    const isPasswordMatch = await matchPassword({ password, user });
    if (!isPasswordMatch) {
        throw new Error('올바르지 않은 비밀번호입니다.');
    }
    return user;
}
module.exports = new LocalStrategy(config, async (email, password, done) => {
    try {
        const user = await findUserOrMatchPassword({ email, password });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
