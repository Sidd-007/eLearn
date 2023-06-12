import mongoose from "mongoose";
const { Schema } = mongoose;

export const instructorApplicationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        questions: {
            type: [String],
            required: true,
        },
        resume: {
            type: String,
            required: true,
            default:"",
        },
    }, // Add a comma here
    { timestamps: true }
);

export default mongoose.model('InstructorApplication', instructorApplicationSchema);