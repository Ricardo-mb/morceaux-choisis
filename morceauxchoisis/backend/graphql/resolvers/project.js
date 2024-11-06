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
  Mutation: {
    // createProject: async (_, { project }) => {
    //   try {
    //     console.log("Received input for new project:", project);

    //     // Create and save the new project
    //     const newProject = new Project({
    //       name: project.name,
    //       description: project.description,
    //       imageUrl: project.imageUrl,
    //       projectUrl: project.projectUrl,
    //       status: project.status,
    //     });

    //     const savedProject = await newProject.save();
    //     console.log("Project successfully saved:", savedProject); // Check saved data

    //     return savedProject; // Return the saved project document
    //   } catch (error) {
    //     console.error("Error creating project:", error);
    //     throw new Error("Failed to create project.");
    //   }
    // },
    createProject: async (_, { project }) => {
      try {
        const newProject = new Project(project);
        const savedProject = await newProject.save();
        console.log("Created project:", savedProject);
        return savedProject;
      } catch (error) {
        console.log("Project creation error:", error);
        throw new Error(error.message);
      }
    },
    updateProject: async (_, { id, project }) => {
      const updatedProject = await Project.findByIdAndUpdate(id, project, {
        new: true,
      });
      return updatedProject;
    },
    deleteProject: async (_, { id }) => {
      const deletedProject = await Project.findByIdAndDelete(id);
      return deletedProject;
    },
  },
};
