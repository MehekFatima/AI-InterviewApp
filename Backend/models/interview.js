const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    jsonResponse: {
        type: Object,
        required: true,
    },
    jobDesc:{
        type: String,
        required: true,
    },
    jobTitle:{
        type: String,
        required: true,
    },
    jobExp:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: false,
    },
    email:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Interview', interviewSchema); 