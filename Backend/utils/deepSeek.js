import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateQuestions = async (jobTitle, experience, jobDescription) => {
  try {
    const prompt = `Generate 5 concise interview questions for the following:
Job Title: ${jobTitle}
Experience: ${experience} years
Skills: ${jobDescription}

Only return the questions in numbered format like:
1. ...
2. ...
3. ...
4. ...
5. ...
`;

    const response = await axios.post(
      'http://127.0.0.1:11434/api/generate',
      {
        model: 'deepseek-r1:1.5b',
        prompt,
        stream: false
      }
    );

    const rawOutput = response.data.response;
    const lines = typeof rawOutput === 'string'
      ? rawOutput.split('\n')
      : Array.isArray(rawOutput)
      ? rawOutput
      : [];

    const questions = lines.filter(line => line.trim().match(/^\d+\./));

    console.log("Generated Questions:", questions);
    return questions;

  } catch (error) {
    console.error("Error generating questions:", error.response?.data || error.message);
    throw new Error("Failed to generate questions");
  }
};
