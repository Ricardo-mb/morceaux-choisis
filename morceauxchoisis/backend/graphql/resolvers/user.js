import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import { generateToken } from "../../utils/auth.js";
import { handleError } from "../../utils/errorHandler.js";
import { validateUserInput } from "../../utils/validators.js";
import { ERROR_MESSAGES } from "../../config/constants.js";

export const userResolvers = {
  Query: {
    users: async (_, __, { userId }) => {
      if (!userId) handleError("Not authenticated", "UNAUTHENTICATED");
      return await User.find({}).select("-password");
    },
    user: async (_, { id }, { userId }) => {
      if (!userId) handleError("Not authenticated", "UNAUTHENTICATED");
      return await User.findById(id).select("-password");
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) handleError("Invalid credentials");

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) handleError("Invalid credentials");

      return {
        token: generateToken(user._id),
        user: user,
      };
    },
    register: async (_, { input }) => {
      const validationError = validateUserInput(
        input.name,
        input.email,
        input.password
      );
      if (validationError) handleError(validationError);

      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) handleError("Email already exists");

      const user = await User.create(input);
      return {
        token: generateToken(user._id),
        user: user,
      };
    },
    updateUser: async (_, { id, input }, { userId }) => {
      if (!userId) handleError("Not authenticated", "UNAUTHENTICATED");

      const user = await User.findById(id);
      if (!user) handleError("User not found", "NOT_FOUND");

      // Only allow users to update their own profile unless they're admin
      const currentUser = await User.findById(userId);
      if (id !== userId && !currentUser.isAdmin) {
        handleError("Not authorized", "FORBIDDEN");
      }

      if (input.email) {
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser && existingUser._id.toString() !== id) {
          handleError("Email already exists");
        }
      }

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...input },
        { new: true }
      ).select("-password");

      return updatedUser;
    },

    deleteUser: async (_, { id }, { userId }) => {
      if (!userId) handleError("Not authenticated", "UNAUTHENTICATED");

      const user = await User.findById(id);
      if (!user) handleError("User not found", "NOT_FOUND");

      // Only allow admins to delete users or users to delete their own account
      const currentUser = await User.findById(userId);
      if (id !== userId && !currentUser.isAdmin) {
        handleError("Not authorized", "FORBIDDEN");
      }

      await User.findByIdAndDelete(id);
      return true;
    },
  },
};
