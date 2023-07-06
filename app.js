const express = require('express');
const cors = require('cors');
const handleError = require('./middlewares/error_handler');

const app = express();

// CORS 에러방지
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(handleError);
