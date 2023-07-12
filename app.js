require('dotenv').config();

const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/error_handler');
const userRouter = require('./routers/user_router');
const productRouter = require('./routers/product_router');
const orderItemRouter = require('./routers/order_item_router');
const orderRouter = require('./routers/order_router');
const categoryRouter = require('./routers/category_router');
const searchRouter = require('./routers/search_router');
const app = express();

const { URL } = process.env;

// 임시로 몽고db와 연결하기 위한 코드입니다.
const PORT = 3000;
const mongoose = require('mongoose');
const insertManyRouter = require('./routers/insertMany_router');
const DB_URL = URL;

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

app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', orderRouter);
app.use('/api', orderItemRouter);
app.use('/api', searchRouter);
app.use('/api', insertManyRouter);
app.use(handleError);

// TODO : 배포후에 지우기
//local 환경에서 서버를 실행시키기 위한 코드입니다.
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 실행중입니다.`);
});

module.exports = app;
