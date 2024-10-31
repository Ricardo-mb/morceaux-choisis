import mongoose from "mongoose";
import User from "../../models/User.js";
import { users } from "../mockData/users.js";
const seedUsers = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Users seeded successfully");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};
