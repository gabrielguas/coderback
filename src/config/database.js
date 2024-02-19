import mongoose from "mongoose";
import { configEnv } from "../config/config.js";

const { DB_USER, DB_PASS, DB_CLUSTER, DB_NAME } = configEnv;

const MONGODB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

const mongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default mongoDBConnection;
