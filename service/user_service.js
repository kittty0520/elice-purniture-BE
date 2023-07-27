const userModel = require('../db/models/user_model');
const { hashPassword } = require('../utils/hash_password');

class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async addUser(userInfo) {
        const { email, password } = userInfo;

        // 이메일 중복 확인하기
        const user = await userModel.findByEmail(email);
        if (user) {
            throw new Error(
                '입력하신 이메일은 이미 사용중입니다. 다른 이메일을 입력해 주세요.',
            );
        }

        // 비밀번호를 해쉬화하기
        const hashedPassword = await hashPassword(password);

        // 새로운 유저의 정보를 DB에 생성하기
        const newUserInfo = { ...userInfo, password: hashedPassword };
        const createdNewUser = await userModel.create(newUserInfo);
        return createdNewUser;
    }

    async getUserData(userId) {
        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error('사용자 정보를 찾을 수 없습니다.');
        }
        return user;
    }

    // 사용자 정보를 수정
    // 하지만 비밀번호를 확인하지 않고 일단 수정 가능하도록 함.
    async updateUser(userId, updateUserInfo) {
        let user = await userModel.findById(userId);
        if (!user) {
            throw new Error('사용자 정보를 찾을 수 없습니다.');
        }

        // 비밀번호를 수정했다면 해쉬화하기
        const { password } = updateUserInfo;

        if (password) {
            const newHashedPassword = await hashPassword(password);
            updateUserInfo.password = newHashedPassword;
        }

        // DB에 업데이트 된 사용자 정보를 업로드하기
        const updatedUser = await userModel.update({
            userId,
            update: updateUserInfo,
        });

        return updatedUser;
    }

    async deleteUser(userId) {
        const deletedUser = await userModel.deleteById(userId);
        return deletedUser;
    }

    async getUsers() {
        const users = await userModel.findAll();
        return users;
    }
    async setRole(userId, role) {
        const updatedUser = await userModel.update({
            userId,
            update: { role },
        });
        return updatedUser;
    }
    async setUserAddress(userId, updateUserAddressInfo) {
        const updatedUser = await userModel.update({
            userId,
            update: { address: updateUserAddressInfo },
        });

        return updatedUser;
    }
}

const userService = new UserService();
module.exports = userService;
