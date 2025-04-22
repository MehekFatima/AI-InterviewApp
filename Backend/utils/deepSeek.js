import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const generateQuestions = async (jobTitle, experience, jobDescription) => {
  try {
    const prompt = `
Generate exactly 5 unique interview questions based on the following job title , description, and experience level. 
Only output the questions in plain text format as a numbered list, without summaries, topics, or explanations.

Job Title: ${jobTitle}
Job Description: ${jobDescription}
Experience: ${experience}

Output format:
1. Question one?
2. Question two?
3. ...
5. Question five?
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

      const questions = lines
      .filter(line => line.trim().match(/^\d+\./))
      .slice(0, 5);
    

    
    return questions;

  } catch (error) {
    console.error("Error generating questions:", error.response?.data || error.message);
    throw new Error("Failed to generate questions");
  }
};
