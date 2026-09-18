const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./ConnectDB/ConnectDB");
const router = require("./authRouters/routes");
const { default: mongoose } = require("mongoose");
const cookieparser = require('cookie-parser')
const app = express();



// middle wares
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(express.json());
app.use(cookieparser())
// Routes
app.get("/", (req, res) => {
    res.status(200).json({ sucess: true, message: "Welcome to the Home Page"});
    console.log("welcome to the home page");
})
// User Routes
app.use("/api/v1/user", router);

// Admin Routes
app.use("/api/v1/admin", router);



connectDB();    


// starts the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server is running at PORT, ${PORT} 👍👍` )
})
















