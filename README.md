# eLearn

An eLearn is an online platform that brings together learners and instructors to share knowledge and skills. It provides a space where learners can access courses on various topics and levels of complexity, and instructors can share their expertise and monetize their skills. 

## Tech Stack

  - NextJS
  - NodeJS
  - ExpressJS
  - MongoDB
  - TailwindCSS
  - Amazon S3 Bucket
  - Cloudinary
  - Razor Pay



## Commands

All commands are run from the root of the project, from a terminal:
  - Clone the repository `git clone https://github.com/Sidd-007/eLearn.git`.
  - Install Dependencies in server's folder `cd server` and `npm i`.
  - Install Dependencies in client's folder `cd client` and `npm i`.
  - Run client at `localhost:3000` using `npm run dev`.
  - Run server at `localhost:5000` using `npm start`.

## Environment Variables 
  - For server (.env)
    
    ```
    PORT = 5000
    DATABASE = "Insert Mongodb URL here. Local or Atlas"
    
    JWT_SECRET = asdjbscg8
    
    ACCESS_ID= Insert Access ID of IAM user of AWS account
    SECRET_KEY= Insert Secret Key of IAM user of AWS account
    AWS_REGION= Insert region of AWS account
    AWS_API_VERSION = 2010-12-01
    
    EMAIL_FROM = Insert email id from which you wants to send emails
    EMAIL = Email Id
    PASS = Email Id Pass
    
    RAZORPAY_API_KEY = "Insert Razorpay Api Key"
    RAZORPAY_API_SECRET = "Insert Razorpay Api Secret"
    
    ```
  - For client (.env.local)
    
    ```
    NEXT_PUBLIC_API='http://localhost:5000/api'
    API = http://localhost:5000/api
    
    ```

  
