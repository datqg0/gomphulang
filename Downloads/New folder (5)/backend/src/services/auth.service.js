const User = require('../models/user.model');
const tokenUtil = require('../utils/token');

const register = async (userData) => {
    //check user is exist
    const userExist = await User.findOne({ email: userData.email });
    if (userExist) {
        throw new Error('User already exists');
    }
    const { username, email, password } = userData;
    const user = await User.create({
        username,
        email,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=C17817&color=fff`
    });
    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return null;
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return null;
    }
    return user;
};

const getUsers = async () => {
    return await User.find();
};

const socialLogin = async (userData) => {
    const { email, username, avatar, googleId, facebookId } = userData;

    let user = await User.findOne({ email });

    if (user) {
        // Update social IDs if they are new
        if (googleId && !user.googleId) user.googleId = googleId;
        if (facebookId && !user.facebookId) user.facebookId = facebookId;

        // Update avatar if current one is default or empty
        if (!user.avatar || user.avatar.includes('ui-avatars.com')) {
            user.avatar = avatar;
        }

        await user.save();
    } else {
        // Create new user
        user = await User.create({
            username,
            email,
            avatar,
            googleId,
            facebookId,
        });
    }

    return user;
};

const updateProfile = async (userId, updateData) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Update fields
    if (updateData.username) user.username = updateData.username;
    if (updateData.email) user.email = updateData.email;
    if (updateData.avatar) user.avatar = updateData.avatar;

    // Handle password update
    if (updateData.password) {
        user.password = updateData.password; // The pre-save hook in the model should hash this
    }

    await user.save();
    return user;
};

const promoteToAdmin = async (email, secretCode) => {
    if (secretCode !== 'PHULANG2026') {
        throw new Error('Invalid setup code');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }

    user.role = 'admin';
    await user.save();
    return user;
};

module.exports = {
    register,
    login,
    getUsers,
    socialLogin,
    updateProfile,
    promoteToAdmin,
};