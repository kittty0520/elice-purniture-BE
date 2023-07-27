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
const app = express();
require('./passport')();
const { DB_URL, PORT } = process.env;

// 몽고db와 연결하기 위한 코드입니다.
const mongoose = require('mongoose');
const insertManyRouter = require('./routers/insertMany_router');
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

// Passport 초기화
app.use(passport.initialize());

// nginx에서도 해당페이지에 대한 접근을 모두 막아야 됨.
// app.get('/html/manage_user.html', onlyAdmin, (req, res) => {
//     res.send('관리자 페이지에 접근하셨습니다.');
// });

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', orderRouter);
app.use('/api', orderItemRouter);
app.use('/api', searchRouter);
app.use('/api', insertManyRouter);
app.use('/api', authRouter);
app.use(handleError);

// TODO : 배포후에 지우기
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 실행중입니다.`);
});

module.exports = app;
