import express from "express";
import { getUserProfile } from '../controllers/userProfile.js';

const router = express.Router();

router.get('/profile', getUserProfile);

export default router;