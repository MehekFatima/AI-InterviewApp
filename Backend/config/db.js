// This code connects to MongoDB database. It imports the necessary modules, loads environment variables from a .env file, and defines a function to establish the connection. If the connection is successful, it logs a message to the console; if it fails, it logs the error and exits the process with a failure code.

// The connectDB function is then exported for use in other parts of the application.

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
  }
};
module.exports = connectDB;