import express, { json } from 'express';

const app = express();

app.use(json());
app.listen(3000, '0.0.0.0');


import userRouter from './api/src/routers/userRouter.js';
import authRouter from './api/src/routers/authRouter.js';


app.use('/user', userRouter);
app.use('/auth', authRouter);

