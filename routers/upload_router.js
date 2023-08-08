const { Router } = require('express');
const upload = require('../middlewares/multer');
const uploadRouter = Router();

uploadRouter.post('/upload', upload.single('productImg'), (req, res, next) => {
    if (req.file) {
        const imageUrl = '/upload/' + req.file.filename;
        // const imageUrl = req.file.path;
        res.status(201).json({ result: 'success-upload', imageUrl });
    } else {
        throw new Error('이미지 파일 업로드 실패했습니다.');
    }
});

module.exports = uploadRouter;
