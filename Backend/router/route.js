import express from 'express';
import { register, login } from '../controller/auth.js';
import { isAuthenticated } from '../middlewares/authentication.js';
import { generateQuestionsGemini, home, getInterview, saveAnswer } from '../controller/home.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/', isAuthenticated, home);


router.post('/generate-questions', isAuthenticated, generateQuestionsGemini);

router.post('/interviews', isAuthenticated, getInterview); 
  
router.post('/answers', isAuthenticated, saveAnswer);  

export default router;
