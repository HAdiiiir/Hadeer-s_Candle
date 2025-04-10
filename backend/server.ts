import app from "./src/app"
import mongoose from "mongoose"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/hadeer-candle"

console.log("Attempting to connect to MongoDB at:", MONGODB_URI)

// Connect to MongoDB with more detailed options
mongoose
  .connect(MONGODB_URI, {
    // Additional options if needed
  })
  .then(() => {
    console.log("Connected to MongoDB successfully")

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection error details:", error)
    process.exit(1)
  })

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection:", err)
  // Close server & exit process
  process.exit(1)
})