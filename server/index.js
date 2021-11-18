import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import imageRoutes from './routes/images.js';

const app = express();
app.use(express.bodyParser({ limit: '50mb' }));
dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Welcome to the user authentication back-end!");
})

app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/images', imageRoutes);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err.message));