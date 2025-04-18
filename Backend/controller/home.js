import { mockInterview } from "../models/mockInterview.js";
import { generateQuestions } from "../utils/gemini.js";




export const home = async (req, res, next) =>{
   res.status(200).json({success:true, message: "welcome back"});
}



// generate questions 

export const generateQuestionsGemini = async (req, res, next) =>{
    console.log("generating questions");
    try {
        const { jobTitle, experience, skills, userId } = req.body;
    
        if (!jobTitle || !experience || !skills || !userId) {
          return res.status(400).json({ message: "Missing required fields" });
        }
    
        const questionsText = await generateQuestions(jobTitle, experience, skills);
        
    
        const questions = questionsText
          .split('\n')
          .filter(q => q.trim().length > 0)
          .map(q => ({ questionText: q.trim() }));

          const interview = new mockInterview({
            userId,
            jobTitle,
            experience,
            skills,
            questions,
            completed: false
          });
      
          // interview.save();
    
        res.status(200).json({ questions });
      } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ message: "Something went wrong" });
      }

}