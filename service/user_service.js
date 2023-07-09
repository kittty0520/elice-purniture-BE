const userModel = require('../db/models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
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

    // 새로운 유저의 정보를 DB에 생성하기
    const newUserInfo = { ...userInfo, password: hashedPassword };
    const createdNewUser = await userModel.create(newUserInfo);
    return createdNewUser;
};
const getTokenAndRole = async (loginInfo) => {
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
    const role = user.role;
    const userToken = jwt.sign({ email, role });
    //user가 관리자이면 isAdmin을 true로 반환하기

    const isAdmin = role === 'admin';

    return { userToken, isAdmin };
};

const getUserData = async (userId) => {
    const user = await userModel.findById(userId);

    if (!user) {
        throw new Error('사용자 정보를 찾을 수 없습니다.');
    }
    return user;
};

// 사용자 정보를 수정
// 하지만 비밀번호를 확인하지 않고 일단 수정 가능하도록 함.
const setUser = async (userId, updateUserInfo) => {
    const user = await userModel.findById(userId);

    if (!user) {
        throw new Error('사용자 정보가 찾을 수 없습니다.');
    }

    // 비밀번호를 수정했다면 해쉬화하기
    const { password } = updateUserInfo;

    if (password) {
        const newHashedPassword = await bcrypt.hash(password, 8);
        updateUserInfo.password = newHashedPassword;
    }

    // DB에 업데이트 된 사용자 정보를 업로드하기
    user = await userModel.update({ userId, update: updateUserInfo });

    return user;
};
module.exports = { addUser, getTokenAndRole, getUserData, setUser };
