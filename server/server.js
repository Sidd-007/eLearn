import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import mongoose from 'mongoose';
import csurf from 'csurf'
import cookieParser from 'cookie-parser';
import Razorpay from 'razorpay'
const morgan = require('morgan')

require("dotenv").config();

const app = express()

const csrfProtection = csurf({ cookie: true });

app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));


export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
})
mongoose.connect(process.env.DATABASE).then(() => console.log("Connected to MongoDB"));

readdirSync("./routes").map((r) =>
    app.use("/api", require(`./routes/${r}`))
)

app.use(csrfProtection)

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() })
})

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is listening to ${port}`))