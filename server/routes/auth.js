import express from 'express';
import { registerEmail, registerGoogle } from '../controllers/userCreation.js';

const router = express.Router();

router.post('/register/email', registerEmail);
router.post('/register/google', registerGoogle);

export default router;