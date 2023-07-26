import exp from 'constants';
import { Router } from 'express';
import { compareSync } from 'bcrypt';
import userModel from '../../src/models/userModel.js';
const authRouter = Router();


authRouter
.route('/signup')
.post(createUser)

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
                    res.status(201).json({
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
        let user = userModel.findOne({email: data.email});
        if (user) {
            checkPassword = compareSync(data.password, user.password);
            if (checkPassword) {
                return res.json({
                    message: 'user has logged in successfully.',
                    userDetails: data
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
        return res.status(500).json({
            message: err
        });
    };
};


export default authRouter;




