import express from "express";
import { getUserProfile, editProfile, editProfilePic } from '../controllers/userProfile.js';

const router = express.Router();

router.get('/profile', getUserProfile);
router.post('/profile_edit', editProfile);
router.post('/profile_pic_edit', editProfilePic);

export default router;