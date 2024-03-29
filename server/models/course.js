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
    video: {},
    free_preview: {
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
    category: {
        type: String,
        default: '',
    },
    tags: {
        type: [String],
        required: true
    },
    published: {
        type: Boolean,
        default: false,
    },
    paid: {
        type: Boolean,
        default: true,
    },
    instructor: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
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
    }],
    lessons: [lessonSchema],

}, { timestamps: true })

export default mongoose.model('Course', courseSchema)