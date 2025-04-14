import app from "./src/app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { sendVerificationEmail, sendPasswordResetEmail } from "./src/services/email.service";

// Load environment variables
dotenv.config();

// Configuration
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/hadeer-candle";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your-refresh-secret";

// Validate required environment variables
if (!process.env.JWT_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  console.error("FATAL ERROR: JWT_SECRET or REFRESH_TOKEN_SECRET is not defined.");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB at:", MONGODB_URI);

// Enhanced MongoDB connection with error handling and events
mongoose.connection.on("connecting", () => console.log("Connecting to MongoDB..."));
mongoose.connection.on("connected", () => console.log("Connected to MongoDB successfully"));
mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
mongoose.connection.on("disconnected", () => console.log("Disconnected from MongoDB"));

// Connect to MongoDB with modern options
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4, // IPv4
  })
  .then(() => {
    console.log("MongoDB connection established");

    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    });

    // Test email service on startup (development only)
    if (process.env.NODE_ENV === "development") {
      sendVerificationEmail({
        email: "test@example.com",
        name: "Test User",
        verificationToken: "sample-verification-token",
      }).catch(console.error);
    }
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  });

// Enhanced error handling
process.on("unhandledRejection", (err: Error) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

process.on("uncaughtException", (err: Error) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  mongoose.connection.close(false).then(() => {
    process.exit(0);
  });
});