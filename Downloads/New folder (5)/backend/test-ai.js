const dotenv = require('dotenv');
dotenv.config();

const aiService = require('./src/services/ai.service');

async function test() {
    console.log("Testing AI Service with AIML API...");
    console.log("AIML_API_KEY present:", !!process.env.AIML_API_KEY);

    try {
        const response = await aiService.generateResponse("Chào bạn, bạn là ai?");
        console.log("AI Response:", response);
    } catch (error) {
        console.error("Test Failed:", error.message);
    }
}

test();
