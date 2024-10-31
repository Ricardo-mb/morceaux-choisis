import { User } from "../../models/User.js";

export const userResolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
  },
};
