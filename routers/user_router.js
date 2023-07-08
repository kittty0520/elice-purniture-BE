const { Router } = require('express');
const onlyAdmin = require('../middlewares/admin_only');
const requireLogin = require('../middlewares/login_required');
const userService = require('../service/user_service');
const userRouter = Router();

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

module.exports = userRouter;
