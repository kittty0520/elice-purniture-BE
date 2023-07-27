const passport = require('passport');
const google = require('./strategy/google');
const local = require('./strategy/local');
module.exports = () => {
    passport.use(local);
    passport.use(google);
};
