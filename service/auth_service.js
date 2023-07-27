const userModel = require('../db/models/user_model');
const { matchPassword } = require('../utils/hash_password');
const jwt = require('../utils/jwt');

class AuthService {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async getToken(user) {
        let isAdmin = false;
        // JWT 생성하기
        const userId = user._id;
        const role = user.role;
        const userToken = jwt.sign({ userId, role });

        // role 확인하기
        if (role === 'admin') {
            isAdmin = true;
        }

        return { userToken, isAdmin };
    }
}

const authService = new AuthService();

module.exports = authService;
