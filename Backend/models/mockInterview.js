import mongoose from 'mongoose';
import { User } from './user.js';

const schema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  jobTitle:{
    type:String,
    required:true
  },
  jobDescription:{
    type:String,
    required:true
  },
  questions: [
    {
        questionText: {type: String, required:true},
        answerText: {type: String},
        aiFeedback: {type: String},
        score: {type:Number},
    }
  ],
  overallFeedback:{
    type:String,
  },
  interviewDate:{
    type:Date,
    default: Date.now
  },
  completed:{
    type: Boolean,
    default: false
  }

})

export const mockInterview = mongoose.model("mockInterview", schema);