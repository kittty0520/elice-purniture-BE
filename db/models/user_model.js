const { model } = require('mongoose');
const UserSchema = require('../schemas/user_schema');

const User = model('users', UserSchema);

class UserModel {
    async findByEmail(email) {
        const user = await User.findOne({ email });
        return user;
    }

    async findById(userId) {
        const user = await User.findOne(
            { _id: userId },
            { password: 0, role: 0, __v: 0 },
        );
        return user;
    }

    async create(userInfo) {
        const createdNewUser = await User.create(userInfo);
        return createdNewUser;
    }

    async findAll() {
        const users = await User.find({}, { password: 0, __v: 0 });
        return users;
    }

    async update({ userId, update }) {
        const filter = { _id: userId };
        const option = {
            returnOriginal: false,
            select: { password: 0, __v: 0 },
        };

        const updatedUser = await User.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    async deleteById(userId) {
        const result = await User.deleteOne({ _id: userId });
        return result;
    }
}

const userModel = new UserModel();

module.exports = userModel;
