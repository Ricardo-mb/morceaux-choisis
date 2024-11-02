import mongoose from "mongoose";
import { User } from "./models/User.js";
import { Project } from "./models/Project.js";
import { users } from "./data/users.js";
import { projects } from "./data/projects.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import colors from "colors";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProjects = projects.map((project) => ({
      ...project,
      user: adminUser,
    }));
    await Project.insertMany(sampleProjects);

    console.log("Data Imported!".magenta.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await User.deleteMany();
    await Project.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
