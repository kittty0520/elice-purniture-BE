const jwtUtils = require('./utils/jwt');
require('dotenv').config();
const express = require('express');
const categoryRouter = require('./routers/category_router');
const mongoose = require('mongoose');
const productRouter = require('./routers/product_router');
const userRouter = require('./routers/user_router')
const orderRouter = require('./routers/order_router');
const orderItemRouter = require('./routers/order_item_router');
// const user = {
//   userId: 'user123',
//   role: 'admin',
// };

// const token = jwtUtils.sign(user);
// console.log(token);
const { URL } = process.env;
const app = express();
const port = 3000;
app.use(express.json());

// 미들웨어 설정 등 필요한 설정 추가

// MongoDB 서버에 연결
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:'elice-furniture'
});

mongoose.connection.on('connected', () => {
  console.log('정상적으로 MongoDB 서버에 연결되었습니다.');
});

// 로그인이 필요한 라우터에 미들웨어 적용
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRouter);
app.use('/api', orderRouter);
app.use('/api', orderItemRouter);




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});