import express from "express";
import { getUserProfile, editProfile } from '../controllers/userProfile.js';

const router = express.Router();

router.get('/profile', getUserProfile);
router.post('/profile_edit', editProfile);

export default router;