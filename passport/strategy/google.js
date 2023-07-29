const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userModel = require('../../db/models/user_model');
require('dotenv').config();

const config = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://kdt-sw-5-team01.elicecoding.com/api/google/callback',
};

//TODO : 만약 LOCAL 이메일이 구글이메일과 같은 경우에는 어떻게 처리할 것인지 고민해보기
async function findOrCreateUser({ email, name }) {
    const user = await userModel.findByEmail(email);

    if (user) {
        return user;
    }

    const createdUser = await userModel.create({
        email,
        fullName: name,
        password: 'GOOGLE_OAUTH',
    });

    return createdUser;
}
//TODO : profile의 구조 확인하기
module.exports = new GoogleStrategy(
    config,
    async (accessToken, refreshToken, profile, done) => {
        const { email, name } = profile._json;
        // console.log(profile);
        try {
            const user = await findOrCreateUser({ email, name });
            done(null, user);
        } catch (e) {
            done(e, null);
        }
    },
);
