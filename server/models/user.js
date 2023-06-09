import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema
    (
        {
            name: {
                type: String,
                trim: true,
                required: true,
            },
            email: {
                type: String,
                trim: true,
                required: true,
                unique: true,
            },
            password: {
                type: String,
                required: true,
                min: 6,
                max: 12,
            },
            picture: {
                type: String,
                default: 'https://res.cloudinary.com/firegram/image/upload/v1665895502/sej3d0wbexemox9jifps.png',
            },
            role: {
                type: [String],
                default: ["Student"],
                enum: ["Student","Instructor","Pending Verification", "Admin"],
            },
            instructorApplication :{},
            reviews: [],
            passwordResetCode: {
                data: String,
                default:  "",
            },

        },

        { timestamps: true }
    )


export default mongoose.model('User', userSchema)