import mongoose from "mongoose";

import { v4 as uuidv4 } from 'uuid';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  answerText: { type: String, default: "" },
  aiFeedback: { type: String, default: "" },
  score: { type: Number, default: null }
});

const schema = new mongoose.Schema({
  interviewId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false
  },
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  questions: [questionSchema], 
  overallFeedback: {
    type: String,
    default: ""
  },
  interviewDate: {
    type: Date,
    default: Date.now
  },
  completed: {
    type: Boolean,
    default: false
  }
});

export const mockInterview = mongoose.model("mockInterview", schema);