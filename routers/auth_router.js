const { Router } = require('express');
const authRouter = Router();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authService = require('../service/auth_service');
const jwt = require('../utils/jwt');
authRouter.use(cookieParser());
//로그인
authRouter.post(
    '/login',
    passport.authenticate('local', {
        session: false,
        failureRedirect: '/html/login.html',
    }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const { userToken, isAdmin } = await authService.getToken(user);
            res.status(200).json({ userToken, isAdmin });
        } catch (err) {
            next(err);
        }
    },
);
authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

authRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        session: false,
        failureRedirect: '/html/login.html',
    }),
    async (req, res, next) => {
        try {
            const user = req.user;

            const { userToken } = await authService.getToken(user);

            res.cookie('token', userToken);

            res.redirect('/api/success');
        } catch (err) {
            next(err);
        }
    },
);
authRouter.get('/success', async (req, res, next) => {
    try {
        const userToken = req.cookies.token;
        // console.log('success 시작', userToken);

        res.cookie('token', userToken);
        // res.appendHeader('Set-Cookie', `token=${userToken};`);
        res.redirect('/html/success.html');
    } catch (err) {
        next(err);
    }
});
authRouter.get('/success/callback', (req, res, next) => {
    try {
        const userToken = req.cookies.token;
        // console.log('콜백 왜 두번도는가', req.cookies);

        if (!userToken) throw new Error('쿠키에 userToken이 없습니다.');
        const { role } = jwt.verify(userToken, res);
        let isAdmin = false;
        if (role === 'admin') {
            isAdmin = true;
        }
        res.json({ userToken, isAdmin });
    } catch (err) {
        next(err);
    }
});
module.exports = authRouter;
