import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  // if (!process.env.JWT_KEY) {
  //   throw new Error("JWT_KEY must be defined");
  // }
  // if (!process.env.MONGO_URI) {
  //   throw new Error("MONGO_URI must be defined");
  // }

  try {
    await mongoose.connect(process.env.URI!);
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  app.listen(process.env.PORT || 4000, () => {
    console.log("Listening on port", process.env.PORT || "4000");
  });
};

start();
// test comment msdsd
