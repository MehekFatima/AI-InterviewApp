import express from 'express';
import { register, login } from '../controller/auth.js';
import { isAuthenticated } from '../middlewares/authentication.js';
import { generateQuestionsGemini, home, getInterview, saveAnswer, getUserData } from '../controller/home.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/user/:id', isAuthenticated, getUserData);

router.post('/generate-questions', isAuthenticated, generateQuestionsGemini);

router.get('/interviews/:interviewId', isAuthenticated, getInterview); 
  
router.post('/interviews/save-answer', isAuthenticated, saveAnswer);


export default router;
