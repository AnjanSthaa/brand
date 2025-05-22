import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1) // process code 1 means exit with failure and 0 means success
    }
} 

//mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js. It simplifies working with MongoDB by providing schema-based solutions for modeling data.
//connectDB is an asynchronous function that connects the application to the MongoDB database using mongoose.
//process.env.MONGO_URI fetches the MongoDB connection string (URI) from environment variables, ensuring secure handling of sensitive data.
//try block attempts to connect to the database using mongoose.connect(), which returns a promise.
//const conn stores the connection object returned upon successful connection.
//console.log() logs a success message with the host name of the connected MongoDB server.
//catch block handles any errors that occur during the connection process.
//Error: ${error.message} logs the error message if the connection fails.
//process.exit(1) stops the application with an exit code of 1, indicating a failure (non-zero exit codes signify errors; 0 indicates success).
