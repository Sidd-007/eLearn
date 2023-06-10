import mongoose from "mongoose"

const { ObjectId } = mongoose.Schema

const paymentSchema = new mongoose.Schema({

    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },

}, { timestamps: true })

export default mongoose.model('Payment', paymentSchema)