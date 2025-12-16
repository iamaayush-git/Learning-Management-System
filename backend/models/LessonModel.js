import mongoose from "mongoose"

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  video: {
    type: String,
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  order: {
    type: Number,
    required: true
  }

}, { timestamps: true })


export const Lesson = mongoose.model("Lesson", lessonSchema)