const userModel = require('../db/models/user-model');
const bcrypt = require('bcrypt');

const addUser = async (userInfo) => {
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

    // 새로운 유저의 정보를 DB에 생성
    const newUserInfo = { ...userInfo, password: hashedPassword };
    const createdNewUser = await userModel.create(newUserInfo);
    return createdNewUser;
};

module.exports = { addUser };
