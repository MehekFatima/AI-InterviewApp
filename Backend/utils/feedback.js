import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateFeedbackWithDeepSeeek = async (qaPairs) => {
    const prompt = qaPairs.map((qa, i) =>
        `${i + 1}. Question: ${qa.question}\nAnswer: ${qa.answer}`
      ).join("\n\n");
    
      const finalPrompt = `Provide personalized feedback for each answer below. Number each feedback clearly.\n\n${prompt}. your feedback must be one or two lines and give a feedback score also`;
    
      const response = await axios.post('http://127.0.0.1:11434/api/generate', {
        model: 'deepseek-r1:1.5b',
        prompt: finalPrompt,
        stream: false
      });
    
      const rawOutput = response.data.response;
      const lines = rawOutput.split('\n').filter(line => line.trim().match(/^\d+\./));

      console.log("feedback",lines);
    
      return lines;
};