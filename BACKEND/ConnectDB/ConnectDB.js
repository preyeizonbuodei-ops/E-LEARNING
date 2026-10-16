const mongoose = require("mongoose");

const connectDB = async () => {

    const connecting = process.env.MONGODB_URI
    try {
        const connect = await mongoose.connect(
            connecting
        );

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
    }
};

module.exports = connectDB;