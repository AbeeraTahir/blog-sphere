import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("connected");
    });

    connection.on("error", () => {
      console.log("connection error");
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
