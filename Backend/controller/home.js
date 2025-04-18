import { mockInterview } from "../models/mockInterview.js";
import { generateQuestions } from "../utils/deepSeek.js";




export const home = async (req, res, next) =>{
   res.status(200).json({success:true, message: "welcome back"});
}



// generate questions 

export const generateQuestionsGemini = async (req, res, next) =>{
    console.log("generating questions");
    try {
        const { jobTitle, experience, jobDescription } = req.body;
    
        if (!jobTitle || !experience || !jobDescription) {
          return res.status(400).json({ message: "Missing required fields" });
        }
    
        const questionsText = await generateQuestions(jobTitle, experience, jobDescription);
        console.log("Generated Questions:", questionsText);
        
    
        const questions = Array.isArray(questionsText)
  ? questionsText.filter(q => q.trim().match(/^\d+\./))  
  : questionsText
      .split('\n')
      .filter(q => q.trim().match(/^\d+\./));

        const formattedQuestions = questions.map((q) => ({questionText:q}));
          const interview = new mockInterview({
            jobTitle,
            experience,
            jobDescription,
            questions: formattedQuestions,
            interviewDate: new Date(),
            completed: false
          });
      
          await interview.save();
    
        res.status(200).json({ questions });
      } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ message: "Something went wrong" });
      }

}