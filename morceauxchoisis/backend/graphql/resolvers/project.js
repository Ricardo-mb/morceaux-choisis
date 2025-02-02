import { Project } from "../../models/Project.js";
import { handleError } from "../../utils/errorHandler.js";
import { uploadToCloudinary } from "../../utils/imageUpload.js";



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
    /**
     * Creates a new project and saves it to the database.
     * @param {Object} project - The project information.
     * @param {string} project.name - The name of the project.
     * @param {string} project.description - The description of the project.
     * @param {Upload} project.image - The image of the project. If not provided, the default image URL will be used.
     * @param {string} project.projectUrl - The URL of the project.
     * @param {string} project.status - The status of the project.
     * @returns {Promise<Project>} - The created project.
     */
    createProject: async (_, { project }, { userId }) => {
    const defaultImageUrl = "https://res.cloudinary.com/dros6cd9l/image/upload/v1738394445/adamoficheproduit_qnsj22.png";

    try {
    // Check authentication
    if (!userId) {
      handleError("Authentication required", "UNAUTHENTICATED");
    }

    let imageUrl = defaultImageUrl;

    // Process the file upload if provided
    if (project.image) {
      console.log("Project Image:", project.image);
      const { createReadStream, filename, mimetype, encoding } = await project.image;
      const file = { createReadStream, filename, mimetype, encoding };
      console.log("File Object@@@@:", file);

      const uploadResult = await uploadToCloudinary(file, {
        folder: "projects",
        allowed_formats: ["jpg", "png", "webp"],
        max_file_size: 5000000, // 5MB limit
      });

      imageUrl = uploadResult.url;
      console.log("Uploaded image URL:", imageUrl);
    }

    // Create the project. If no image was provided, use the default image URL.
    const newProject = new Project({
      ...project,
      imageUrl,
      createdBy: userId,
    });

    const savedProject = await newProject.save();
    console.log("Created project@@@@:", savedProject);
    return savedProject;
  } catch (error) {
     console.error("Error in createProject resolver:", error);
    handleError(error.message);
  }
},
    
    /**
     * Updates a project by its ID.
     * @async
     * @function updateProject
     * @param {Object} _ - Unused parameter.
     * @param {Object} args - The arguments object.
     * @param {string} args.id - The ID of the project to update.
     * @param {Object} args.project - The updated project information.
     * @param {string} args.userId - The ID of the user performing the update.
     * @returns {Object} The updated project.
     */
    updateProject: async (_, { id, project, userId }) => {
      const updatedProject = await Project.findByIdAndUpdate(id, project, {
        new: true,
        user: userId,
        message: console.log("USER ID", userId),
        
      });
      return updatedProject;
    },

/**
 * Deletes a project by its ID.
 * @async
 * @function deleteProject
 * @param {Object} _ - Unused parameter.
 * @param {Object} args - The arguments object.
 * @param {string} args.id - The ID of the project to delete.
 * @returns {Promise<Object|null>} - The deleted project object, or null if not found.
 */
    deleteProject: async (_, { id }) => {
      const deletedProject = await Project.findByIdAndDelete(id);
      return deletedProject;
    },
  },
};





  
