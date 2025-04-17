import express from 'express';
import { register, login } from '../controller/auth.js';
import { isAuthenticated } from '../middlewares/authentication.js';
import { generateQuestionsGemini, home } from '../controller/home.js';

const router = express.Router();

router.post('/register', register);
router.get('/login', login);
router.get('/', isAuthenticated, home);
router.post('/generate-questions', (req, res, next) => {
      console.log("Route hit!");
      next();
    }, isAuthenticated, generateQuestionsGemini);
    

export default router;