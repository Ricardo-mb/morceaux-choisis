import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  projectUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["IN_PROGRESS", "COMPLETED", "ON_HOLD"],
    default: "IN_PROGRESS",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Project = mongoose.model("Project", projectSchema);

export { Project };
