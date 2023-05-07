import express from 'express'
import cors from 'cors'
import { readdirSync } from 'fs'
import mongoose from 'mongoose';

import cookieParser from 'cookie-parser';

const morgan = require('morgan')



require("dotenv").config();

const app = express()

app.use(cookieParser());
app.use(cors());
app.use(express.json())
app.use(morgan("dev"));

// app.use((req,res, next) => { 
//     console.log("This is Middleware"); 
//     next();
// })

// app.get('/' , )

mongoose.connect(process.env.DATABASE).then(() => console.log("Connected to MongoDB"));

readdirSync("./routes").map((r) => 
    app.use("/api", require(`./routes/${r}`))
)



const port = process.env.PORT || 5000

app.listen(port , () => console.log(`Server is listening to ${port}`))