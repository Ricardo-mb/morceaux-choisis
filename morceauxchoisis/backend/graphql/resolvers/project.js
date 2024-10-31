import { Project } from "../../models/Project.js";

export const projectResolvers = {
  Query: {
    projects: async (_, { filters }) => {
      const query = {};
      if (filters?.status) query.status = filters.status;
      if (filters?.name) query.name = { $regex: filters.name, $options: "i" };

      return await Project.find(query);
    },
    project: async (_, { id }) => {
      return await Project.findById(id);
    },
  },
};
