const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const ruleBasedSentiment = ({ rating, reviewText }) => {
    const positiveWords = ['great', 'amazing', 'wonderful', 'excellent', 'loved', 'fantastic', 'enjoyed', 'superb'];
    const negativeWords = ['bad', 'terrible', 'boring', 'worst', 'awful', 'poor', 'disappointed', 'hate'];

    let score = 0;
    const text = reviewText.toLowerCase();

    positiveWords.forEach(word => { if (text.includes(word)) score++; });
    negativeWords.forEach(word => { if (text.includes(word)) score--; });

    if (rating) {
        const numRating = parseFloat(rating);
        if (!isNaN(numRating)) {
            if (numRating >= 4) score++;
            else if (numRating <= 2) score--;
        }
    }

    if (score > 0) return { sentiment: 'Positive', reason: 'The review contains positive keywords and/or a high rating.' };
    if (score < 0) return { sentiment: 'Negative', reason: 'The review contains negative keywords and/or a low rating.' };
    return { sentiment: 'Neutral', reason: 'The review is ambiguous or lacks clear sentiment indicators.' };
};
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
         console.warn("Gemini analysis failed, falling back to rule-based approach.");
          return ruleBasedSentiment({ rating, reviewText });
    }
}

module.exports = SentimateAnalyzer;