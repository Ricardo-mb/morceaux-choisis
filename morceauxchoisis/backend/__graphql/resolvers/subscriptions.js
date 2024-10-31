import { pubsub } from "../pubsub.js";

export const subscriptions = {
  projectCreated: {
    subscribe: () => pubsub.asyncIterator(["PROJECT_CREATED"]),
  },
  projectUpdated: {
    subscribe: () => pubsub.asyncIterator(["PROJECT_UPDATED"]),
  },
  projectDeleted: {
    subscribe: () => pubsub.asyncIterator(["PROJECT_DELETED"]),
  },
  userCreated: {
    subscribe: () => pubsub.asyncIterator(["USER_CREATED"]),
  },
  userUpdated: {
    subscribe: () => pubsub.asyncIterator(["USER_UPDATED"]),
  },
  userDeleted: {
    subscribe: () => pubsub.asyncIterator(["USER_DELETED"]),
  },
};
