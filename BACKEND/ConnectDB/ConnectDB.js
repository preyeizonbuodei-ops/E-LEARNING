const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            "mongodb://localhost:27017/faculty"
        );

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

module.exports = connectDB;