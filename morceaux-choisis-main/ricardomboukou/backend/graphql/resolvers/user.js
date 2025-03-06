import bcrypt from "bcryptjs";
import { User } from "../../models/User.js";
import { generateToken, hashPassword,} from "../../utils/auth.js";
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
    loginMutation: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("User from UserResolver***:", user);
      
      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      console.log("Valid password from UserResolver***:", validPassword);
      
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const token = generateToken(user._id);
      console.log("Token from UserResolver***:", token);

      return {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          isAdmin: user.isAdmin
        }
      };
    },
    registerMutation: async (_, { input }) => {
      const validationError = validateUserInput(
        input.name,
        input.email,
        input.password,
        input.role,
        input.isAdmin,
      );
      if (validationError) handleError(validationError);

      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) handleError("Email already exists");

      // const user = await User.create(input);
      // return {
      //   token: generateToken(user._id),
      //   user: user,
      // };

       try {
          //const hashedPassword = await bcrypt.hash(input.password, 12);

          // const user = new User({
          //   name: input.name,
          //   email: input.email,
          //   password: hashedPassword,
          //   role: input.role || 'USER',
          //   isAdmin: input.role === 'ADMIN' ? true : false,
          //   accountStatus: 'active',
          //   loginCount: 0,
          //   skills: [],
          //   createdAt: new Date().toISOString(),
          //   updatedAt: new Date().toISOString(),
          // });
          
          
          const user = new User({
            name: input.name,
            email: input.email,
            password: input.password,
            role: input.role || 'USER',
            isAdmin: input.isAdmin || false,
            // accountStatus: 'active',
            // loginCount: 0,
            // skills: [],
            // createdAt: new Date().toISOString(),
            // updatedAt: new Date().toISOString(),
          });

          const savedUser = await user.save();
          const token = generateToken(savedUser._id);

          return {
            token,
            user: savedUser
      };
    } catch (error) {
      handleDatabaseError(error);
    }
    
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
        { new: true },
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
        { $set: { password: await hashPassword(newPassword) } },
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
        { $set: { password: await hashPassword(newPassword) } },
      );

      return {
        token: generateToken(user._id),
        user,
      };
    },
    requestPasswordReset: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const resetToken = generateToken(); // Create a token
      await User.updateOne(
        { email },
        { resetToken, resetTokenExpiry: Date.now() + 3600000 },
      );

      // Send email with reset token
      await sendResetEmail(email, resetToken);

      return {
        success: true,
        message: "Reset password instructions sent to email",
      };
    },
    resetPassword: async (_, { input: { email, token, newPassword } }) => {
      const user = await User.findOne({
        email,
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() },
      });

      if (!user) {
        throw new Error("Invalid or expired reset token");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = null;
      user.resetTokenExpiry = null;

      await user.save();

      const authToken = generateJWT(user); // Generate new JWT

      return {
        token: authToken,
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

