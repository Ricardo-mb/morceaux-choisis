import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  imageUrl: String,
  projectUrl: String,
  status: {
    type: String,
    enum: ["In Progress", "Completed", "On Hold"],
    default: "In Progress",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export { Project };
