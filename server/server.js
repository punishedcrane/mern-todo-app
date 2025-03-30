const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Import Routes
const todoRoutes = require("./routes/todoRoutes");
app.use("/api", todoRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// Start Server
const PORT = process.env.PORT || 400;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
