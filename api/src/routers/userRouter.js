import { Router } from 'express';
import userModel from '../../src/models/userModel.js';
import protectRoute from './authHelper.js';
const userRouter = Router();


userRouter
.route('/')
.get(protectRoute, getUser)

userRouter
.route('/:email')
.get(getUserByEmail)


async function getUser(req, res) {
    const users = await userModel.find();
    return res.json({
        message: "user data fetched successfully",
        users: users
    });
};

async function getUserByEmail(req, res) {
    const paramEmail = req.params.email;
    const user = await userModel.findOne({email: paramEmail});
    if (user) {
        return res.json({
            message: "data fetched successfully",
            user: user
        });
    } else {
        return res.status(404).json({
            message: "user not found.",
        });
    };
};


export default userRouter;

