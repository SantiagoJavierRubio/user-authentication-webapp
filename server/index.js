import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';

const csrfMiddleware = csrf({ cookie: true });

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
//app.use(csrfMiddleware);

const PORT = process.env.PORT || 5000;

// app.all('*', (req, res, next) => {
//     res.cookie("XSRF-TOKEN", req.csrfToken());
//     next();
// })

app.get('/', (req, res) => {
    res.send("Welcome to the user authentication back-end!");
})

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch(err => console.log(err.message));