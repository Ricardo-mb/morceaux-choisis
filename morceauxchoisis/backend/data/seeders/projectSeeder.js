import mongoose from "mongoose";
import Project from "../../models/Project.js";
import { projects } from "../mockData/projects.js";

const seedProjects = async () => {
  try {
    await Project.deleteMany();
    await Project.insertMany(projects);
    console.log("Projects seeded successfully");
  } catch (error) {
    console.error("Error seeding projects:", error);
  }
};

export { seedProjects };
