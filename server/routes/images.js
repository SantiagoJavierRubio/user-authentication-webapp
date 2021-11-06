import express from 'express';
import { uploadImage, singleUploadCtrl } from '../controllers/imageUpload.js';

const router = express.Router();

router.post('/upload', singleUploadCtrl, uploadImage);

export default router;