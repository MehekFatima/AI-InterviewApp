import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateFeedbackWithDeepSeeek = async (qaPairs) => {
  const prompt = qaPairs.map((qa, i) => {
    const answer = qa.answer || "No answer provided"; // Default to "No answer provided" if the answer is empty
    return `${i + 1}. Question: ${qa.question}\nAnswer: ${answer}`;
  }).join("\n\n");

  console.log("Generated Prompt:", prompt); 

const finalPrompt = `Provide personalized feedback for each answer below. If an answer is missing or not provided, give a default message like "No answer provided". Number each feedback clearly.\n\n${prompt}. Your feedback must be one or two lines and include a feedback score.`;

try {
    const response = await axios.post('http://127.0.0.1:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt: finalPrompt,
        stream: false
    });

    console.log("API Response:", response.data); // Log API response

    const rawOutput = response.data.response;
    const lines = rawOutput.split('\n').filter(line => line.trim().match(/^\d+\./));

    console.log("Parsed Feedback:", lines);

    return lines;

} catch (error) {
    console.error("Error generating feedback:", error);
    return [];
}
};