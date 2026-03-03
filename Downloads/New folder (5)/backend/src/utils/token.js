const jwt = require('jsonwebtoken');

const generateToken = (userOrId) => {
    const id = typeof userOrId === 'object' ? userOrId._id : userOrId;

    return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
        expiresIn: process.env.JWT_EXPIRE || '30d',
    });
};

module.exports = {
    generateToken,
};