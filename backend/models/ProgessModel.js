import mongoose from "mongoose"

const progressSchema = new mongoose.Schema({
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
  completedLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  percentatge: {
    type: Number,
    default: 0
  }

}, { timestamps: true })

export const Progress = mongoose.model("Progress", progressSchema)