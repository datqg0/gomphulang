const authService = require('../services/auth.service');
const response = require('../utils/response');
const tokenUtil = require('../utils/token');

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body);
        const token = tokenUtil.generateToken(user);

        // Remove password from response
        user.password = undefined;

        res.status(201).json(response.success({ user, token }, 'User registered successfully', 201));
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);

        if (!user) {
            return res.status(401).json(response.error('Invalid credentials', 401));
        }

        const token = tokenUtil.generateToken(user);

        // Remove password from response
        user.password = undefined;

        res.status(200).json(response.success({ user, token }, 'User logged in successfully'));
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await authService.getUsers();
        res.status(200).json(response.success(users, 'Users fetched successfully'));
    } catch (error) {
        next(error);
    }
};

const socialLogin = async (req, res, next) => {
    try {
        const user = await authService.socialLogin(req.body);
        const token = tokenUtil.generateToken(user);

        res.status(200).json(response.success({ user, token }, 'User logged in via social account successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getUsers,
    socialLogin,
};
