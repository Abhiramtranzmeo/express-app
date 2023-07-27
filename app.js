import express, { json } from 'express';

const app = express();

app.use(json());
app.listen(3000, '0.0.0.0');


import userRouter from './api/src/routers/userRouter.js';


app.use('/user', userRouter);

 