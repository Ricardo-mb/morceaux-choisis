import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`.magenta.bold);

    // Listen for connection errors after initial connection
    mongoose.connection.on("error", (err) => {
      console.log(`MongoDB connection error: ${err}`.red.bold);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected".yellow.bold);
    });
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`.red.bold);
    // Log the full error stack in development
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    process.exit(1);
  }
};

export { connectDB };
