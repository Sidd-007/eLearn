import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;


const completedLessonsSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
    },
    course: {
        type: ObjectId,
        ref: "Course",
    },
    lessons: []
}, { timestamps: true });


export default mongoose.model("CompletedLessons", completedLessonsSchema)