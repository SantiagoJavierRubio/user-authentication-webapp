import express from 'express';
import { uploadImage, singleUploadCtrl, deleteLatestImage } from '../controllers/imageManager.js';

const router = express.Router();

router.post('/upload', singleUploadCtrl, uploadImage);
router.post('/delete_latest', deleteLatestImage);

export default router;