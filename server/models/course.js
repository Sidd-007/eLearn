import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlenght: 3,
        maxlength: 100,
        required: true,
    },

    slug: {
        type: String,
        lowercase: true,
    },
    content: {
        type: {},
        minlength: 200,
    },
    video_link: {},
    fre_preview: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true })

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlenght: 3,
        maxlength: 100,
        required: true,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: {},
        minlength: 200,
        required: true,
    },
    price: {
        type: Number,
        default: 9.99
    },
    image: {},
    category: String,
    publised: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: Boolean,
        default: true,
    },
    admin: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    lessons: [lessonSchema],

}, { timestamps: true })

export default mongoose.model('Course', courseSchema)