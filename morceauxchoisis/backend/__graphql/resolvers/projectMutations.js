import { pubsub } from "../pubsub.js";

export const projectMutations = {
  createProject: async (_, { input }, context) => {
    const project = await Project.create(input);
    pubsub.publish("PROJECT_CREATED", { projectCreated: project });
    return project;
  },

  updateProject: async (_, { id, input }, context) => {
    const project = await Project.findByIdAndUpdate(id, input, { new: true });
    pubsub.publish("PROJECT_UPDATED", { projectUpdated: project });
    return project;
  },

  deleteProject: async (_, { id }, context) => {
    const project = await Project.findByIdAndDelete(id);
    pubsub.publish("PROJECT_DELETED", { projectDeleted: project });
    return project;
  },
};
