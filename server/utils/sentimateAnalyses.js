const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const SentimateAnalyzer = async ({movieName, rating, reviewText})=>{

    const model = genAI.getGenerativeModel({
        model :'gemini-1.5-flash'
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

    try {
        const response = await model.generateContent(prompt);
        const outputText = response.response.text().trim();
        const cleaned = outputText.replace(/```json|```/g, '').trim();
        const {sentiment, reason} = JSON.parse(cleaned);
        return {sentiment, reason};
    } catch (error) {
         console.error("Parsing Gemini response failed:", error);
         return { sentiment: "Neutral", reason: "Failed to analyze sentiment." };
    }
}

module.exports = SentimateAnalyzer;