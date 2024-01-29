import { unstable_noStore as noStore } from "next/cache";
import User from "../models/userModel";
import { connect } from "../database/dbConnection";

export const getUser = async (id: string) => {
  noStore();
  try {
    connect();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};
