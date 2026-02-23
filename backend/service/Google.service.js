// 1. सही पैकेज को इम्पोर्ट करें
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 2. API Key के साथ इनिशियलाइज़ करें
const genAI = new GoogleGenerativeAI('AIzaSyCesnAwLr5IM4YE11KbrUdnOKYZ8Jg-vm8');

async function main(prompt) {
    try {
        // 3. मॉडल गेट करें (स्मॉल लेटर्स में नाम लिखें)
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // 4. जनरेट करें
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // 5. टेक्स्ट वापस करें (.text() एक फंक्शन है)
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error.message);
        return "AI Error: " + error.message;
    }
}

module.exports = main;