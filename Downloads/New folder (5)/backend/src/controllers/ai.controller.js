const aiService = require('../services/ai.service');
const response = require('../utils/response');

const chatWithAI = async (req, res, next) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json(response.error('Tin nhắn không được để trống', 400));
        }

        const aiResponse = await aiService.generateResponse(message);
        res.status(200).json(response.success({ content: aiResponse }, 'AI response generated successfully'));
    } catch (error) {
        next(error);
    }
};

module.exports = {
    chatWithAI,
};
