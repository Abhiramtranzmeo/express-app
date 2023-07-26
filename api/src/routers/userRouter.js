import { Router } from 'express';
import userModel from '../../src/models/userModel.js';
const userRouter = Router();


userRouter
.route('/')
.get(getUser)

userRouter
.route('/:email')
.get(getUserByEmail)


async function getUser(req, res) {
    const users = await userModel.find();
    res.json({
        message: "user data fetched successfully",
        users: users
    });
};

async function getUserByEmail(req, res) {
    const paramEmail = req.params.email;
    const user = await userModel.findOne({email: paramEmail});
    if (user) {
        res.json({
            message: "data fetched successfully",
            user: user
        });
    } else {
        res.status(404).json({
            message: "user not found.",
        })
    }    
};


export default userRouter;



