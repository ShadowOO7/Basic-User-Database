const express = require("express");
const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const {logReqRes} = require("./middlewares");

const app = express();
const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/app-01")
    .then(() => console.log("MongoDB Connected!"));

// Middleware to parse body and log requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("access.log")); // Add file name for logging

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`✅ Server started at PORT: ${PORT}`));
