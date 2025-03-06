import mongoose from "mongoose";
import { hashPassword } from "../utils/auth.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    role: { 
      type: String,
      enum: ["ADMIN", "USER", "GUEST"],
      default: "USER"
    },
    accountStatus: { type: String, default: 'active' },
    loginCount: { type: Number, default: 0 },
    skills: [{ type: String }]
  },
  { timestamps: true }
);userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hashPassword(this.password);
  }
  next();
});
const User = mongoose.model("User", userSchema);

export { User };
