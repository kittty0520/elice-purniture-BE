const userModel = require('../db/models/user_model');

class DuplicateService {
    async checkEmail(email) {
        const user = await userModel.findByEmail(email);
        return !!user; // 이미 존재하면 true, 없으면 false 반환
    }
}

const duplicateService = new DuplicateService();
module.exports = duplicateService;
