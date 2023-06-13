import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema
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
                enum: ["Student", "Instructor", "Pending Verification", "Admin"],
            },
            instructorApplication: {},
            passwordResetCode: {
                data: String,
                default: "",
            },
            courses: [
                {
                    type: ObjectId,
                    ref: "Course"
                }
            ],
            reviews: [
                {
                    course: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Course',
                    },
                    title: {
                        type: String,
                        required: true,
                    },
                    rating: {
                        type: Number,
                        required: true,
                    },
                    courseFeedback: {
                        type: String,
                        required: true,
                    },
                    instructorFeedback: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },

        { timestamps: true }
    )


export default mongoose.model('User', userSchema)