import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  lessson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lessson",
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: v => v.length >= 2
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    default: 1
  }
}, { timestamps: true })

export const Quiz = mongoose.model("Quiz", QuizSchema)
