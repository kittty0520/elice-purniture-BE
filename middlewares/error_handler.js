module.exports = (error, req, res, next) => {
    // HTTP 400에러 잘못된 요청에 대한 응답
    res.status(400).json({ result: 'error', reason: error.message });
};
