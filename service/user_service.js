const userModel = require('../db/models/user_model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

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
        const hashedPassword = await bcrypt.hash(password, 8);

        // 새로운 유저의 정보를 DB에 생성하기
        const newUserInfo = { ...userInfo, password: hashedPassword };
        const createdNewUser = await userModel.create(newUserInfo);
        return createdNewUser;
    }
    async getTokenAndRole(loginInfo) {
        const { email, password } = loginInfo;

        // DB에 이메일이 존재하는지 확인하기
        const user = await userModel.findByEmail(email);
        if (!user) {
            throw new Error('해당 이메일은 존재하지 않습니다.');
        }

        // DB에 저장된 비밀번호와 일치하는지 확인하기
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error('올바르지 않은 비밀번호입니다.');
        }

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

    async getUserData(userId) {
        const user = await userModel.findById(userId);

        if (!user) {
            throw new Error('사용자 정보를 찾을 수 없습니다.');
        }
        return user;
    }

    // 사용자 정보를 수정
    // 하지만 비밀번호를 확인하지 않고 일단 수정 가능하도록 함.
    async setUser(userId, updateUserInfo) {
        let user = await userModel.findById(userId);
        if (!user) {
            throw new Error('사용자 정보를 찾을 수 없습니다.');
        }

        // 비밀번호를 수정했다면 해쉬화하기
        const { password } = updateUserInfo;

        if (password) {
            const newHashedPassword = await bcrypt.hash(password, 8);
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
