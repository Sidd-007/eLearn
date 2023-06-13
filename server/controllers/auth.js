
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from 'jsonwebtoken'

import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'
import User from "../models/user";

const nodemailer = require("nodemailer");

const awsConfig = {
    accessKeyId: process.env.ACCESS_ID,
    secretAccessKey: process.env.SECRET_KEY,
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
}


const SES = new AWS.SES(awsConfig);

export const register = async (req, res) => {
    try {
        const { name, email, password, imageUrl } = req.body;
        console.table({ name, email, password, imageUrl })

        if (!name) return res.status(400).send("Name is required")

        if (!password || password.length < 6) {
            return res.status(400).send("Password is required and should be of length 6 characters")
        }

        let userExist = await User.findOne({ email }).exec();

        if (userExist) return res.status(400).send("Email is taken")

        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            picture: imageUrl,
        }).save();
        console.log("Saved User", user);
        return res.json({ ok: true });

    } catch (error) {
        console.log(error);
        return res.send.status(400).send("Error occured")
    }
    res.send('Register user')
};

export const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();
        // if(!user)
        //     return res.status(400).send("No user found")

        const match = await comparePassword(password, user.password)

        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" },)

        user.password = undefined

        res.cookie("token", token, {
            httpOnly: true,
        });

        res.json(user)
    } catch (error) {
        console.log(error);
        return res.sendStatus(400).send("Error occured")
    }
    // res.send('Register user')
};

export const logout = async (req, res) => {
    try {

        res.clearCookie("token")
        return res.json({ message: "See Ya!!" })

    } catch (error) {
        console.log(error)
    }
}

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.auth._id).select("-password").exec();
        console.log("Current User", user);
        return res.json({ ok: true })
    } catch (error) {
        console.log(error)
    }
}


export const sendTestEmail = async (req, res) => {
    let config = {
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    }
    let transporter = nodemailer.createTransport(config);
    let message = {
        from: 'iamsiddhantmeshram@gmail.com',
        to: 'iamsiddhantmeshram@gmail.com',
        subject: "Password Reset Code",
        html: `
            <html>
            <h1>Hii</h1>
            </html>
            
            `
    }
    transporter.sendMail(message).then(() => {
        console.log("Send Email using SES")
        res.json({ ok: true })
    }).catch((err) => {
        console.log(err)
    })
}

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const shortCode = nanoid(6).toUpperCase()

        const user = await User.findOneAndUpdate({ email }, { passwordResetCode: shortCode })

        if (!user) return res.status(404).send("User not found")

        let config = {
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS
            }
        }
        let transporter = nodemailer.createTransport(config);
        let message = {
            from: 'elearn.org.com@gmail.com', // sender address
            to: email, // list of receivers
            subject: "Password Reset Code",
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    
                    h1 {
                        color: #333;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
                    
                    p {
                        color: #555;
                        font-size: 16px;
                        line-height: 1.5;
                    }
                    
                    .code {
                        font-size: 20px;
                        font-weight: bold;
                        background-color: #f5f5f5;
                        padding: 10px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Reset Password Link</h1>
                    <p>Use this code to reset your password:</p>
                    <div class="code">${shortCode}</div>
                </div>
            </body>
            </html>
            
                
                `// html body
        }
        transporter.sendMail(message).then(() => {
            console.log("Send Email using SES")
            res.json({ ok: true })
        }).catch((err) => {
            console.log(err)
        })

    } catch (error) {
        console.log(error)
    }
}

export const resetPassword = async (req, res) => {

    try {

        const { email, code, newPassword } = req.body;
        console.table({ email, code, newPassword })

        const hashedPassword = await hashPassword(newPassword);

        const user = await User.findOneAndUpdate({ email, passwordResetCode: code }, { password: hashedPassword, passwordResetCode: "", }).exec()

        res.json({ ok: true })

    } catch (error) {
        console.log(error)
    }
}