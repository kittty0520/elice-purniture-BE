const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    const saltOrRounds = 8;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
};
const matchPassword = async ({ password, user }) => {
    const isMatchPassword = await bcrypt.compare(password, user.password);
    return isMatchPassword;
};

module.exports = { hashPassword, matchPassword };
