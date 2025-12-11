// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sakshamjain_db_user:0000@cluster0.unw8kvr.mongodb.net/?appName=Cluster0");

    console.log("✅ MongoDB Connected (Atlas)");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
