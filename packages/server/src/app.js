/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './router/user.js';
import taskRouter from './router/task.js';

dotenv.config();

mongoose.connect(process.env.DB_URI);

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(userRouter);
app.use(taskRouter);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.listen(PORT);