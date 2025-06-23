const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const SentimateAnalyzer = async ({movieName, rating, reviewText})=>{

    const model = genAi.getGenerativeModel({
        model :'gemini-pro'
    });

    const prompt = `
          You are a sentiment analysis expert. Analyze the following movie review and respond in **this JSON format**:

          {
           "sentiment": "Positive | Negative | Neutral",
           "reason": "A short explanation of why the sentiment was classified that way."
          }

          Guidelines:
           - Consider the tone, language, and emotion expressed in the review.
           - Use the rating if provided to support your judgment.
           - If the review is ambiguous, return "Neutral".

          Movie Name: "${movieName || 'N/A'}" 
          User Rating: ${rating || 'N/A'}
          Review: "${reviewText}"`;

    const response = await model.generateContent(prompt);
    const outputText = response.response.text().trim();

    try {
        const answer = JSON.parse(outputText);
        const sentiment = answer.sentiment;
        const reason = answer.reason;
        return {sentiment, reason};

    } catch (error) {
         console.error("Parsing Gemini response failed:", err);
         return { sentiment: "Unknown", reason: "Failed to analyze sentiment." };
    }
}

module.exports = SentimateAnalyzer;