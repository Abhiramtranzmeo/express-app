import { Router } from 'express';
import { compareSync } from 'bcrypt';
const authRouter = Router();
import jwt from 'jsonwebtoken';
const JWT_KEY = 'dsader432r4tr4rdsfaffbnbvn';
import userModel from '../../src/models/userModel.js';
import validPasswordCheck from './passworkCheck.js';


authRouter
.route('/signup')
.post(validPasswordCheck, createUser)

authRouter
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


export default authRouter;

