const { Router } = require('express');
const authRouter = Router();
const passport = require('passport');
const authService = require('../service/auth_service');

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
    '/auth/google',
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

            const { userToken, isAdmin } = await authService.getToken(user);
            res.status(200).json({ userToken, isAdmin });
        } catch (err) {
            next(err);
        }
    },
);
module.exports = authRouter;
