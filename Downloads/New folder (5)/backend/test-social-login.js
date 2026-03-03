const mongoose = require('mongoose');
const User = require('./src/models/user.model');
const authService = require('./src/services/auth.service');
const dotenv = require('dotenv');

dotenv.config();

const runTest = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gomphulang');
        console.log('Connected to MongoDB');

        const testData = {
            email: 'test.social@example.com',
            username: 'Test Social User',
            avatar: 'https://example.com/avatar.png',
            googleId: 'google-test-id'
        };

        console.log('Testing social login (New User)...');
        const user1 = await authService.socialLogin(testData);
        console.log('User 1 created/found:', user1.username, user1.email);

        console.log('Testing social login (Existing User)...');
        const user2 = await authService.socialLogin(testData);
        console.log('User 2 found:', user2.username, user2.email);

        if (user1._id.toString() === user2._id.toString()) {
            console.log('SUCCESS: Same user ID returned for existing email.');
        } else {
            console.log('FAILURE: Different user IDs returned.');
        }

        // Cleanup
        await User.deleteOne({ email: testData.email });
        console.log('Test user deleted.');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Test failed:', error);
        process.exit(1);
    }
};

runTest();
