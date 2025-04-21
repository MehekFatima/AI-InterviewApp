import { mockInterview } from "../models/mockInterview.js";
import { User } from "../models/user.js";
import { generateQuestions } from "../utils/deepSeek.js";
import mongoose from 'mongoose';




export const home = async (req, res, next) =>{
   res.status(200).json({success:true, message: "welcome back"});
}



// generate questions 

export const generateQuestionsGemini = async (req, res, next) =>{
    console.log("generating questions");
    try {
        const {userId, jobTitle, experience, jobDescription} = req.body;


        console.log("given data is",userId, jobTitle, experience, jobDescription )
    
        if (!jobTitle || !experience || !jobDescription || !userId) {
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
        // const userId = req.user._id;
          const newInterview = await mockInterview.create({
            jobTitle,
            experience,
            jobDescription,
            questions: formattedQuestions,
            interviewDate: new Date(),
            userId,
            completed: false
          });
      
          // await interview.save();
    
        res.status(200).json({ newInterview });
      } catch (error) {
        console.error("Error generating questions:", error);
        res.status(500).json({ message: "Something went wrong" });
      }

}

// user data

export const getUserData = async(req, res)=>{

  try {
    const userId = req.params.id;

    
    const user = await User.findById(userId).select('name email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const interviews = await mockInterview.find({ userId }).select('-__v');

    res.status(200).json({
      name: user.name,
      email: user.email,
      interviews
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }

}




export const getInterview = async (req, res) => {
  console.log("Fetching interview data");
  console.log(req.params.interviewId);
  try {
    const userId = req.params.interviewId;
    console.log("User ID:", userId);

    const interview = await mockInterview.findOne({ userId }).sort({ interviewDate: -1 });
    if (!interview) return res.status(404).json({ message: "No interview found" });
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch interview", error });
  }
};




export const saveAnswer = async (req, res) => {
  try {
    const { interviewId, text, questionIndex } = req.body;
    console.log("Saving answer for interviewId:", interviewId);
    console.log("Answer text:", text);
    console.log("Question index:", questionIndex);

    if (!mongoose.Types.ObjectId.isValid(interviewId)) {
      return res.status(400).json({ message: 'Invalid interview ID' });
    }

    const interview = await mockInterview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: 'Interview not found' });
    }

    if (!interview.questions || !interview.questions[questionIndex]) {
      return res.status(400).json({ message: 'Invalid question index' });
    }

    interview.questions[questionIndex].answerText = text;

    // Optional: only set completed when all answers are filled
    // interview.completed = interview.questions.every(q => q.answerText && q.answerText.trim());

    await interview.save();

    res.status(200).json({ message: 'Answer saved successfully' });
  } catch (error) {
    console.error("Error in saveAnswer:", error); 
    res.status(500).json({ message: 'Error saving answer', error: error.message || error });
  }
};

