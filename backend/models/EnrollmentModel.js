import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "free"],
    default: "paid",
    required: true
  }
}, { timestamps: true })

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema)
