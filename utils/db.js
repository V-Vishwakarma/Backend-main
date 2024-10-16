import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection successful");

    // Ensure that the connection is open
    mongoose.connection.once("open", () => {
      console.log("Mongoose connected to the database");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
