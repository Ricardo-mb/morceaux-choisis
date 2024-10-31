import { pubsub } from "../pubsub.js";
import { User } from "../models/User.js";

export const userMutations = {
  createUser: async (_, { input }, context) => {
    const user = await User.create(input);
    pubsub.publish("USER_CREATED", { userCreated: user });
    return user;
  },

  updateUser: async (_, { id, input }, context) => {
    const user = await User.findByIdAndUpdate(id, input, { new: true });
    pubsub.publish("USER_UPDATED", { userUpdated: user });
    return user;
  },

  deleteUser: async (_, { id }, context) => {
    const user = await User.findByIdAndDelete(id);
    pubsub.publish("USER_DELETED", { userDeleted: user });
    return user;
  },
};
