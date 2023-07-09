const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/error_handler');
const userRouter = require('./routers/user_router');

const app = express();

// 임시로 몽고db와 연결하기 위한 코드입니다.
const PORT = 3000;
const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/elice-furniture';

// CORS 에러방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', userRouter);
app.use(handleError);

//임시로 몽고db와 연결하기 위한 코드입니다.

mongoose.connect(DB_URL);
mongoose.connection.on('connected', () =>
    console.log('정상적으로 MongoDB 서버에 연결되었습니다.  ' + DB_URL),
);

//local 환경에서 서버를 실행시키기 위한 코드입니다.
app.listen(PORT, () => {
    console.log(`서버가 ${PORT}에서 실행중입니다.`);
});

module.exports = app;
