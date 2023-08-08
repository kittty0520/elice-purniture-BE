const multer = require('multer');
const path = require('path');
const fs = require('fs');

const serverRoot = path.resolve(process.cwd());

const publicDirectory = './public';
if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory);
}

const uploadDirectory = './public/upload';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '_' + file.originalname);
    },
});
const limits = {
    fileSize: 5 * 1024 * 1024, //최대 파일 사이즈 : 5MB
};
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error('PNG, JPG만 업로드하세요'));
    }
    cb(null, true);
};
const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
