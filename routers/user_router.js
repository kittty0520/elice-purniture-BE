const { Router } = require('express');
const onlyAdmin = require('../middlewares/admin_only');
const requireLogin = require('../middlewares/login_required');
const userService = require('../service/user_service');
const userRouter = Router();

// 회원가입
userRouter.post('/register', async (req, res, next) => {
    try {
        // request에서 회원정보 가져오기
        const {
            userNumber,
            fullName,
            email,
            password,
            phoneNumber,
            postalCode,
            address,
        } = req.body;
        // 회원 정보를 DB(user collection)에 추가하기
        const user = await userService.addUser({
            userNumber,
            fullName,
            email,
            password,
            phoneNumber,
            postalCode,
            address,
        });

        res.status(201).json({ result: 'success-register', user });
    } catch (err) {
        next(err);
    }
});

//로그인
userRouter.post('/login', async (req, res, next) => {
    try {
        // request에서 이메일과 패스워드를 가져옴
        const { email, password } = req.body;

        // userToken과 isAdmin을 가져옴
        const { userToken, isAdmin } = await userService.getTokenAndRole({
            email,
            password,
        });
        res.status(200).json({ userToken, isAdmin });
    } catch (err) {
        next(err);
    }
});

//사용자 정보 조회
userRouter.get('/account', requireLogin, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const currentUser = await userService.getUserData(userId);

        res.status(200).json(currentUser);
    } catch (err) {
        next(err);
    }
});

//
module.exports = userRouter;
