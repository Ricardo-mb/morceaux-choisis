import mongoose from "mongoose";
import { hashPassword } from "../utils/auth.js";
import { USER_ROLES } from "../config/constants.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    avatar: { type: String },
    bio: { type: String },
    skills: [{ type: String }],
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
    lastLogin: { type: Date },
    loginCount: { type: Number, default: 0 },
    accountStatus: {
      type: String,
      enum: ["active", "suspended", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});
const User = mongoose.model("User", userSchema);

export { User };
