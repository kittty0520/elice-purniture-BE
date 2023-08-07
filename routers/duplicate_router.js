const { Router } = require('express');
const duplicateService = require('../service/duplicate_service');
const duplicateRouter = Router();

duplicateRouter.get('/checkemail', async (req, res, next) => {
    try {
        const { email } = req.query;
        const isEmailTaken = await duplicateService.checkEmail(email);
        res.status(200).json({ isEmailTaken });
    } catch (err) {
        next(err);
    }
});

module.exports = duplicateRouter;
