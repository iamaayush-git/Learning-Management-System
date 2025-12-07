import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  thumbnail: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  published: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

export const Course = mongoose.model("Course", courseSchema)

