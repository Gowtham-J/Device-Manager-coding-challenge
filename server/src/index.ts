import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
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
