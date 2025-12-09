const express = require("express");
const connectDB = require('./config/connectDB.js');
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const providerRoutes = require("./routes/providerRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Body parser
app.use(express.json());

// Connect to Database
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});



