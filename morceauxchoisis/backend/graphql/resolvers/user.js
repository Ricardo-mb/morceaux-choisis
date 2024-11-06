import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import { generateToken, hashPassword } from "../../utils/auth.js";
import { handleError } from "../../utils/errorHandler.js";
import { validateUserInput } from "../../utils/validators.js";
import { ERROR_MESSAGES } from "../../config/constants.js";

export const userResolvers = {
  Query: {
    users: async (_, __, { userId }) => {
      // First verify user exists and get their details
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        handleError(ERROR_MESSAGES.USER_NOT_FOUND, "NOT_FOUND");
      }

      // Check if user is admin
      if (!currentUser.isAdmin) {
        handleError(ERROR_MESSAGES.UNAUTHORIZED, "FORBIDDEN");
      }

      // If admin, return all users
      return await User.find({}).select("-password");
    },
    user: async (_, { id }, { userId }) => {
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        handleError(ERROR_MESSAGES.USER_NOT_FOUND, "NOT_FOUND");
      }

      // Check if user is admin
      if (!currentUser.isAdmin) {
        handleError(ERROR_MESSAGES.UNAUTHORIZED, "FORBIDDEN");
      }

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
      // First check if we have a userId from context
      if (!userId) {
        // If not, throw an error
        handleError(ERROR_MESSAGES.UNAUTHENTICATED, "UNAUTHENTICATED");
      }

      // Get current user and handle null case
      const currentUser = await User.findById(userId);
      if (!currentUser) {
        handleError(ERROR_MESSAGES.USER_NOT_FOUND, "NOT_FOUND");
      }

      // Now we can safely check isAdmin since we know currentUser exists
      if (id !== userId && !currentUser.isAdmin) {
        handleError(ERROR_MESSAGES.UNAUTHORIZED, "FORBIDDEN");
      }

      // Proceed with update
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { ...input },
        { new: true }
      ).select("-password");

      return updatedUser;
    },

    deleteUser: async (_, { id }, { userId }) => {
      const currentUser = await User.findById(userId);
      checkUserPermissions(userId, id, currentUser.isAdmin);

      await User.findByIdAndDelete(id);
      return true;
    },

    updateAdminPassword: async (_, { email, newPassword }) => {
      const user = await User.findOne({ email });
      if (!user || !user.isAdmin) {
        handleError("User not found or not admin");
      }

      // Set password directly without triggering pre-save middleware
      await User.updateOne(
        { _id: user._id },
        { $set: { password: await hashPassword(newPassword) } }
      );

      return {
        token: generateToken(user._id),
        user,
      };
    },

    // Update User Password
    updateUserPassword: async (_, { email, newPassword }) => {
      const user = await User.findOne({ email });
      if (!user) {
        handleError("User not found");
      }

      // Set password directly without triggering pre-save middleware
      await User.updateOne(
        { _id: user._id },
        { $set: { password: await hashPassword(newPassword) } }
      );

      return {
        token: generateToken(user._id),
        user,
      };
    },
  },
};
const checkUserPermissions = (userId, id, isAdmin) => {
  if (!userId) handleError(ERROR_MESSAGES.UNAUTHENTICATED, "UNAUTHENTICATED");
  if (id && userId !== id && !isAdmin) {
    handleError(ERROR_MESSAGES.UNAUTHORIZED, "FORBIDDEN");
  }
};
