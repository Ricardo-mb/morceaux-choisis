import { Project } from "../../models/Project.js";
import { handleError } from "../../utils/errorHandler.js";
import { uploadToCloudinary } from "../../utils/imageUpload.js";
import {v2 as cloudinary} from "cloudinary";
import { GraphQLUpload } from 'graphql-upload-minimal';
import dotenv from "dotenv";

dotenv.config();



export const projectResolvers = {

  Upload: GraphQLUpload,

  Query: {
    projects: async (_, { filters }) => {
     try {
       const query = {};
      if (filters?.status) query.status = filters.status;
      if (filters?.name) query.name = { $regex: filters.name, $options: "i" };
      return await Project.find(query);   
     } catch (error) {
      return handleError(error);
     }
    },
    project: async (_, { id }) => {
      return await Project.findById(id);
    },
  },

Mutation: {
 
  getCloudinarySignature: () => {
      const timestamp = Math.round(new Date().getTime() / 1000);
      const params = {
        timestamp,
        folder: "portfolio",
      };

      console.log("Params:", params);
      console.log("CLOUDINARY_API_SECRET:", process.env.CLOUDINARY_API_SECRET);

      const signature = cloudinary.utils.api_sign_request(
        params,
        process.env.CLOUDINARY_API_SECRET
      );

      console.log("Generated Signature:", signature);

      return {
        timestamp,
        signature,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      };
    },
    // createProject: async (_, { project }, { userId }) => {
    //   if (!userId) throw new Error("Authentication required");

    //   const defaultImageUrl = "https://res.cloudinary.com/dros6cd9l/image/upload/t_Text overlay/v1740325583/bupvddpg9y4uxsnjo1er.webp";

    //   let imageUrl = defaultImageUrl;
      
    //   try {
    //     // Upload image only if provided
    //     if (project.image) {
    //       console.log("Uploading image...");
    //       imageUrl = await uploadToCloudinary(project.image);
    //     }
    //     console.log("Image URL from create***:", imageUrl);

    //     // Create and save the project
    //     const newProject = new Project({ ...project, imageUrl, createdBy: userId });
    //     return await newProject.save();
    //   } catch (error) {
    //     console.error("Project Creation Error:", error);
    //     throw new Error(error.message);
    //   }
      // },
  createProject: async (_, { project }, { userId }) => {
      console.log("Received project from project resolver:", project);
      if (!userId) throw new Error("Authentication required");

      let imageUrl = project.imageUrl || "https://res.cloudinary.com/dros6cd9l/image/upload/v1740406338/portfolio/xvfhgdmu2vwhnljoyywc.jpg";

      if (project.image) {
        try {
          console.log("Uploading image to Cloudinary...", project.image);
          const uploadResult = await uploadToCloudinary(project.image);
          imageUrl = uploadResult.secure_url;
        } catch (error) {
          console.error("Image upload failed:", error);
          throw new Error("Image upload failed. Please check Cloudinary configuration.");
        }
      }

      try {
        console.log('Project object received on server:', project);
        const newProject = new Project({ ...project, imageUrl, createdBy: userId });
        return await newProject.save();
      } catch (dbError) {
        console.error("Database save error:", dbError);
        throw new Error("Failed to save project. Please try again later.");
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

  // deleteProject: async (_, { id }, context) => {
  //     try {
  //       // Check if there's middleware stopping the request:
  //       console.log("Request context:", context);

  //       console.log(`Attempting to delete project with ID: ${id}`);
        
  //       // First find the project to ensure it exists
  //       const project = await Project.findById(id);
  //       if (!project) {
  //         console.error("Project not found");
  //         throw new Error("Project not found");
  //       }
        
  //       // Store project data before deletion
  //       const projectData = project.toObject();
  //       console.log("Project found, data:", projectData);
        
  //       // Then delete it
  //       const result = await Project.deleteOne({ _id: id });
  //       console.log("Delete operation result:", result);
        
  //       if (result.deletedCount === 0) {
  //         throw new Error("Delete operation failed");
  //       }
        
  //       return projectData; // Return the data we captured before deletion
  //     } catch (error) {
  //       console.error(`Error deleting project with ID: ${id}`, error);
  //       throw new Error(`Failed to delete project: ${error.message}`);
  //     }
  //   }
  },
};





  
