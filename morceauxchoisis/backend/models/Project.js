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
    enum: ["IN_PROGRESS", "COMPLETED", "ON_HOLD"],
    default: "IN_PROGRESS",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
// createdBy: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User",
//   required: true,
// },
  }, {
  timestamps: true,
});

const Project = mongoose.model("Project", projectSchema);

export { Project };
