require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const handleError = require('./middlewares/error_handler');
const onlyAdmin = require('./middlewares/admin_only');
const userRouter = require('./routers/user_router');
const productRouter = require('./routers/product_router');
const orderItemRouter = require('./routers/order_item_router');
const orderRouter = require('./routers/order_router');
const categoryRouter = require('./routers/category_router');
const searchRouter = require('./routers/search_router');
const paymentRouter = require('./routers/payment_router');
const duplicateRouter = require('./routers/duplicate_router');
const uploadRouter = require('./routers/upload_router');
const app = express();
require('./passport')();
const { DB_URL, PORT } = process.env;

// 몽고db와 연결하기 위한 코드입니다.
const mongoose = require('mongoose');

const authRouter = require('./routers/auth_router');

mongoose.connect(DB_URL, {
    dbName: 'elice-furniture',
});
mongoose.connection.on('connected', () =>
    console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL),
);

// CORS 에러방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 정적 파일 제공
app.use(express.static('public'));

// Passport 초기화
app.use(passport.initialize());

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', orderRouter);
app.use('/api', orderItemRouter);
app.use('/api', searchRouter);
app.use('/api', authRouter);
app.use('/api', paymentRouter);
app.use('/api', duplicateRouter);
app.use('/api', uploadRouter);
app.use(handleError);

// TODO : 배포후에 지우기
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 실행중입니다.`);
});

module.exports = app;
