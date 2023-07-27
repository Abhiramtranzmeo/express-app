import { Router } from 'express';
import userModel from '../../src/models/userModel.js';
import protectRoute from './authHelper.js';
import { compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_KEY = 'dsader432r4tr4rdsfaffbnbvn';
import validPasswordCheck from './passworkCheck.js';
const userRouter = Router();


userRouter
.route('/')
.get(protectRoute, getUser)

userRouter
.route('/profile')
.get(getUserByEmail)

userRouter
.route('/signup')
.post(validPasswordCheck, createUser)

userRouter
.route('/login')
.post(loginUser)


async function createUser(req, res) {
    try {
        let dataObj = req.body;
        userModel.init()
        .then(async () => {
            if (req.body.password === req.body.confirmPassword) {
                const user = new userModel(dataObj);
                await user.save().then(() => {
                    return res.status(201).json({
                        message: "user created successfully.",
                    });
                })
                .catch(err => {
                    res.status(401).json(err.message);
                });
            } else {
                res.status(401).json({
                    error: "passwords do not match"
                });
            };
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: err
        });
    };
};

async function loginUser(req, res) {
    try {
        let data = req.body;
        let user = await userModel.findOne({email: data.email});
        if (user) {
            let checkPassword = compareSync(data.password, user.password);
            if (checkPassword) {
                const uid = user._id;
                const token = jwt.sign({payload: uid}, JWT_KEY);
                return res.json({
                    message: 'user has logged in successfully.',
                    userDetails: {
                        "_id": user._id,
                        "token": token
                    }
                });
            } else {
                return res.status(403).json({
                    message: 'Wrong credentials.'
                });
            };
        } else {
            return res.status(404).json({
                message: 'user not found.'
            });
        };
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            message: err
        });
    };
};

async function getUser(req, res) {
    const users = await userModel.find();
    return res.json({
        message: "user data fetched successfully",
        users: users
    });
};

async function getUserByEmail(req, res) {
    const email = req.body.email;
    const user = await userModel.findOne({email: email});
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

