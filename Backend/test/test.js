const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Interview = require('../models/interview');

const testDB = async () => {
    await connectDB();

    const sample = new Interview({
        jsonResponse: {
            question: "What is your name?",
            answer: "My name is Mehek",
        },
        jobDesc: "Software Engineer",
        jobTitle: "Software Engineer",
        jobExp: "2 years",
        name: "Mehek Fatima",
        email: "jkjkj@example.com",
    });
    try {
        const result = await sample.save();
        console.log("data saved", result);
    } catch (error) {
        console.error("Error saving data:", error);
    }
}
testDB();