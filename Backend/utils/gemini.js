import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, 
});

export const generateQuestions = async (jobTitle, experience, skills) => {
  console.log("⚙️ Initializing OpenAI model...");

  const prompt = `
I am preparing for a job interview. 
- Job Title: ${jobTitle}
- Years of Experience: ${experience}
- Skills: ${skills.join(', ')}

Based on this, generate 5 technical interview questions that are relevant and challenging.
  `;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo', // or 'gpt-4' if you have access
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  });

  const text = response.choices[0]?.message?.content || '';
  return text;
};
