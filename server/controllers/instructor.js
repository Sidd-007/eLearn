import User from "../models/user";
import Course from "../models/course";
// import stripe from "stripe"
import queryString from 'query-string'

const stripe = require('stripe')(process.env.STRIPE_SECRET)

export const makeInstructor = async (req, res, next) => {
    // 1. find user from db
    const user = await User.findById(req.auth._id).exec();

    // 2. if user dont have stripe_account_id yet, then create new
    if (!user.stripe_account_id) {
        const account = await stripe.accounts.create({ type: "express" });
        // console.log('ACCOUNT => ', account.id)
        user.stripe_account_id = account.id;
        user.save();
    }
    // 3. create account link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
        account: user.stripe_account_id,
        refresh_url: process.env.STRIPE_REDIRECT_URL,
        return_url: process.env.STRIPE_REDIRECT_URL,
        type: "account_onboarding",
    });

    // 4. pre-fill any info such as email (optional), then send url resposne to frontend
    accountLink = Object.assign(accountLink, {
        "stripe_user[email]": user.email,
    });

    // 5. then send the account link as response to fronend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
}


export const currentInstructor = async (req, res) => {
    try {

        let user = await User.findById(req.auth._id).select("-password").exec();

        if(!user.role.includes("Instructor")) {
            return res.sendStatus(403);
        } else {
            res.json({ ok : true });
        }
        
    } catch (error) {
        console.log(error)
    }
}

export const instructorCourses = async (req,res) => {
    try {
        const courses = await Course.find({instructor: req.auth._id}).sort({createdAt: -1}).exec();

        res.json(courses);
        
    } catch (error) {
        console.log(error)
    }
}