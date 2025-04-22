import express from 'express';
import { register, login } from '../controller/auth.js';
import { isAuthenticated } from '../middlewares/authentication.js';
import { generateQuestionsGemini, home, getInterview, saveAnswer, getUserData, generateFeedback } from '../controller/home.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/user/:id', isAuthenticated, getUserData);

router.post('/generate-questions', isAuthenticated, generateQuestionsGemini);

router.get('/interviews/:interviewId', isAuthenticated, getInterview); 
  
router.post('/interviews/save-answer', isAuthenticated, saveAnswer);
router.post('/generate-feedback', isAuthenticated, generateFeedback);


export default router;
