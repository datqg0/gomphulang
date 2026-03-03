const generateResponse = async (userPrompt) => {
    try {
        if (!process.env.AIML_API_KEY) {
            throw new Error("AIML_API_KEY is not defined in environment variables!");
        }

        const systemInstruction = `
Bạn là trợ lý AI chính thức đại diện cho thương hiệu Gốm Phù Lãng truyền thống tại Việt Nam.

Bạn có kiến thức sâu rộng về:
- Các sản phẩm gốm Phù Lãng như: bình hoa, chum vại, lọ trang trí, đèn gốm, đồ thờ thủ công.
- Đặc trưng men da lươn với màu nâu vàng tự nhiên.
- Kỹ thuật tạo hình thủ công và đắp nổi hoa văn truyền thống.
- Quy trình nung bằng lò bầu cổ.
- Lịch sử và giá trị văn hóa của làng nghề Phù Lãng.

Khi trả lời khách hàng:
- Luôn giữ thái độ thân thiện, lịch sự và chuyên nghiệp.
- Giải thích rõ ràng, dễ hiểu, mang tính giới thiệu văn hóa làng nghề.
- Tư vấn sản phẩm phù hợp với nhu cầu trang trí, làm quà tặng hoặc trưng bày.

Nếu khách hỏi về giá:
Hãy trả lời rằng giá sản phẩm dao động từ 80.000đ đến 500.000đ tùy kích thước và độ tinh xảo, và mời khách tham khảo mục sản phẩm để biết chi tiết.

Luôn cung cấp thông tin địa chỉ:
Làng Gốm Phù Lãng, xã Phù Lãng, thị xã Quế Võ, tỉnh Bắc Ninh.

Mục tiêu của bạn là giúp khách hàng hiểu rõ giá trị nghệ thuật, truyền thống và khuyến khích họ trải nghiệm sản phẩm.
`;
        const fullPrompt = `${systemInstruction}\n\nKhách hàng hỏi: ${userPrompt}`;

        const response = await fetch('https://api.aimlapi.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.AIML_API_KEY.trim()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: "google/gemma-3-4b-it",
                messages: [
                    {
                        role: "user",
                        content: fullPrompt
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("AIML API Error:", errorData);
            throw new Error(errorData.message || `API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("AI Service Error:", error);
        throw new Error("Không thể kết nối với dịch vụ AI. Vui lòng thử lại sau.");
    }
};

module.exports = {
    generateResponse,
};
