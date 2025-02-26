import { Project } from "../../models/Project.js";
import { handleError } from "../../utils/errorHandler.js";
import { uploadToCloudinary } from "../../utils/imageUpload.js";
import {v2 as cloudinary} from "cloudinary";
import { GraphQLUpload } from 'graphql-upload-minimal';
import dotenv from "dotenv";
import mongoose from "mongoose";
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
//   Mutation: {
//     /**
//      * Creates a new project and saves it to the database.
//      * @param {Object} project - The project information.
//      * @param {string} project.name - The name of the project.
//      * @param {string} project.description - The description of the project.
//      * @param {Upload} project.image - The image of the project. If not provided, the default image URL will be used.
//      * @param {string} project.projectUrl - The URL of the project.
//      * @param {string} project.status - The status of the project.
//      * @returns {Promise<Project>} - The created project.
//      */
//     createProject: async (_, { project }, { userId }) => {
//       console.log("Incoming project data:", project);
//       console.log("Current userId:", userId);
      
//       const defaultImageUrl =
//         "https://res.cloudinary.com/dros6cd9l/image/upload/v1738394445/adamoficheproduit_qnsj22.png";

//       console.log("Project received @@@@:", project);

//       try {
//         // Check authentication
//         if (!userId) {
//           throw new Error("Authentication required");
//         }

//         let imageUrl = defaultImageUrl;

//         // Process the file upload if provided
//         if (project.image) {
//           console.log("Processing file upload...");
          
//           // FIX: Extract stream properly
//           const { createReadStream } = project.image;
//           const stream = createReadStream(); // Correct way to get the stream

//           try {
//             // FIX: Pass the stream instead of an object
//             const uploadResult = await uploadToCloudinary(stream, {
//               folder: "projects",
//               allowed_formats: ["jpg", "png", "webp"],
//               max_file_size: 5000000, // 5MB limit
//             });

//             imageUrl = uploadResult.secure_url;
//             console.log("Uploaded image URL:", imageUrl);
//           } catch (uploadError) {
//             console.error("Error uploading image:", uploadError);
//             throw new Error("Image upload failed");
//           }
//         }

//         // Create the project with the uploaded image URL
//         const newProject = new Project({
//           ...project,
//           imageUrl: imageUrl,
//           createdBy: userId,
//         });

//         const savedProject = await newProject.save();
//         console.log("Saved project @@@@:", savedProject);

//         return savedProject;
//       } catch (error) {
//         console.error("Error in createProject resolver:", error);
//         throw new Error(error.message);
//       }
//     },
    
//       createProject: async (_, { project }, { userId }) => {
//           if (!userId) throw new Error("Authentication required");

//           let imageUrl = project.imageUrl || "https://res.cloudinary.com/dros6cd9l/image/upload/t_Text overlay/v1740325583/bupvddpg9y4uxsnjo1er.webp";

//           if (project.image) {
//             imageUrl = await uploadToCloudinary(project.image);
//           }

//   const newProject = new Project({ ...project, imageUrl, createdBy: userId });
//   return await newProject.save();
// },
    /**
     * Updates a project by its ID.
//      * @async
//      * @function updateProject
//      * @param {Object} _ - Unused parameter.
//      * @param {Object} args - The arguments object.
//      * @param {string} args.id - The ID of the project to update.
//      * @param {Object} args.project - The updated project information.
//      * @param {string} args.userId - The ID of the user performing the update.
//      * @returns {Object} The updated project.
//      */
//     updateProject: async (_, { id, project, userId }) => {
//       const updatedProject = await Project.findByIdAndUpdate(id, project, {
//         new: true,
//         user: userId,
//         message: console.log("USER ID", userId),
        
//       });
//       return updatedProject;
//     },

// /**
//  * Deletes a project by its ID.
//  * @async
//  * @function deleteProject
//  * @param {Object} _ - Unused parameter.
//  * @param {Object} args - The arguments object.
//  * @param {string} args.id - The ID of the project to delete.
//  * @returns {Promise<Object|null>} - The deleted project object, or null if not found.
//  */
//     deleteProject: async (_, { id }) => {
//       const deletedProject = await Project.findByIdAndDelete(id);
//       return deletedProject;
//     },
//   },
Mutation: {
  //  getCloudinarySignature: () => {
  //    const timestamp = Math.round(new Date().getTime() / 1000);
  //    const params={
  //     timestamp,
  //     folder: "portfolio",
  //     allowed_formats: ["jpg", "png", "webp"],  
  //     max_file_size: 5000000, // 5MB limit,
  //     api_key: process.env.CLOUDINARY_API_KEY,
  //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //     resource_type: "image",
  //    }
  //    const signature = cloudinary.utils.api_sign_request(
  //     params,
  //     process.env.CLOUDINARY_API_SECRET
  //    );
  //     console.log("Cloudinary API Key:", signature.apiKey);
  //       console.log("Cloudinary Cloud Name:", signature.cloudName);
  //       console.log("Generated Timestamp:", timestamp);
  //       console.log("Generated Signature:", signature);
  //    return { 
  //     timestamp, 
  //     signature,
  //     apiKey: process.env.CLOUDINARY_API_KEY,
  //     cloudName: process.env.CLOUDINARY_CLOUD_NAME
  //    };
  //  },


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
  },
  // deleteProject: async (_, { id },context) => {
  //    console.log("Received ID from client:", id);
  //   //Convert string ID to MOngoose ObjectId
  //   const projectId = new mongoose.Types.fromString(id);
  //   console.log("Converted ID to ObjectId:", projectId);

  //   const project = await Project.findById(projectId);
  //   console.log("Project found:", project);

  //   if (!project) {
  //     console.error('Project not found');
  //     throw new Error("Project not found");
  //   }
  //   //Check if the user is authorized to delete the project
  //   if(context.userId !== project.createdBy.toString()) {
  //     throw new Error("You are not authorized to delete this project");
  //   }

  //    try {
  //   const deletedProject = await Project.findByIdAndDelete(projectId);
  //   console.log('Project deleted successfully:', deletedProject);
  //   if (!deletedProject) {
  //     console.error('Project not deleted');
  //   }
  //   return deletedProject;
  // } catch (error) {
  //   console.error('Error deleting project:', error);
  //   throw new Error('Failed to delete project. Please try again later.');
  // }

  //   // try {
  //   //   const deletedProject = await Project.findByIdAndDelete(projectId);
  //   //   return deletedProject;
  //   // } catch (error) {
  //   //   console.error("Error deleting project:", error);
  //   //   throw new Error("Failed to delete project. Please try again later.");
  //   // }
  // }


  // deleteProject: async (_, { id }) => {
  //     try {
  //       console.log(`Attempting to delete project with ID: ${id}`);
  //       const deletedProject = await Project.findByIdAndDelete(id);
  //       console.log(`Result of delete operation: ${deletedProject}`);
  //       return deletedProject;
  //     } catch (error) {
  //       console.error(`Error deleting project with ID: ${id}`, error);
  //       throw new Error("Failed to delete project. Please try again later.");
  //     }
  //   },
 
  // deleteProject: async (_, { id }) => {
  // try {
  //   console.log(`Attempting to delete project with ID: ${id}`);

  //   // Convert id to ObjectId if it's not already
  //   const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : id;
  //   const deletedProject = await Project.findByIdAndDelete(objectId);

  //   if (!deletedProject) {
  //       throw new Error("Project not found")
  //   }

  //   console.log(`Result of delete operation: ${deletedProject}`);
  //   return deletedProject; // Return the deleted project (or null if not found)
  //   } catch (error) {
  //     console.error(`Error deleting project with ID: ${id}`, error);
  //     // throw new Error("Failed to delete project. Please try again later."); // Throw an error
  //     return handleError(error);
  //   }
  // },


  // deleteProject: async (_, { id }) => {
  //   console.log("Received ID from client:", id);
  // try {
  //   const result = await Project.deleteOne({ _id: id });
  //   console.log("Result of delete operation:", result);
  //   if (result.deletedCount === 0) {
  //     throw new Error("Project not found");
  //   }
  //   // Need to fetch the project before deletion to return it
  //   const project = await Project.findById(id);
  //   console.log("Project after deletion:", project);
  //   return project;
  //   } catch (error) {
  //     console.error(`Error deleting project with ID: ${id}`, error);
  //     throw new Error("Failed to delete project. Please try again later.");
  //   }
  // }


  //   deleteProject: async (_, { id }) => {
  //   try {
  //     // First find the project
  //     const project = await Project.findById(id);
  //     console.log("Project found:", project);

  //     if (!project) {
  //       throw new Error("Project not found");
  //     }
      
  //     // Then delete it
  //     await Project.deleteOne({ _id: id });
      
  //     return project; // Return the found project (which is now deleted)
  //   } catch (error) {
  //     console.error(`Error deleting project with ID: ${id}`, error);
  //     throw new Error("Failed to delete project. Please try again later.");
  //   }
  // }

//   deleteProject: async (_, { id }, { userId }) => {
//   try {
//     // Find the project first
//     const project = await Project.findById(id);
//     if (!project) {
//       throw new Error("Project not found");
//     }
    
//     // Check if user is authorized to delete
//     if (userId !== project.createdBy.toString()) {
//       throw new Error("You are not authorized to delete this project");
//     }
    
//     // Delete the project
//     await project.deleteOne();
//     return project;
//   } catch (error) {
//     console.error(`Error deleting project with ID: ${id}`, error);
//     throw new Error("Failed to delete project. Please try again later.");
//   }
// }


// deleteProject: async (_, { id }) => {
//   try {
//     // First find the project to ensure it exists and to return it later
//     const project = await Project.findById(id);
//     if (!project) {
//       throw new Error("Project not found");
//     }
    
//     // Convert to a plain object that can be returned after deletion
//     const projectToReturn = project.toObject();
    
//     // Now delete it
//     await Project.deleteOne({ _id: id });
    
//     return projectToReturn; // Return the project data even though it's deleted from DB
//   } catch (error) {
//     console.error(`Error deleting project with ID: ${id}`, error);
//     throw new Error("Failed to delete project. Please try again later.");
//   }
// }

    // deleteProject: async (_, { id }) => {
    //   const deletedProject = await Project.findByIdAndDelete(id);
    //   return deletedProject;
    // },

deleteProject: async (_, { id }) => {
      try {
        console.log(`Attempting to delete project with ID: ${id}`);
        const deletedProject = await Project.findByIdAndDelete(id);
        console.log(`Result of delete operation: ${deletedProject}`);
        if (!deletedProject) {
          console.log(`No project found with ID: ${id}`);
        } else {
          console.log(`Deleted project with ID: ${id}`);
        }
        return deletedProject;
      } catch (error) {
        console.error(`Error deleting project with ID: ${id}`, error);
        throw new Error("Failed to delete project. Please try again later.");
      }
    },

    deleteProjectWithKey: async (_, { id, adminKey }) => {
      try {
        console.log(`Attempting to delete project with ID: ${id} using admin key`);
        console.log(`Admin Key: ${adminKey}`);
        // Verify the admin key
        if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) {
          console.log('Invalid admin key');
          throw new Error('Invalid admin key');
        }
        console.log('Admin key verified');
        // Perform the deletion
        const deletedProject = await Project.findByIdAndDelete(id);
        console.log(`Result of delete operation with key: ${deletedProject}`);
        if (!deletedProject) {
          console.log(`No project found with ID: ${id}`);
          throw new Error(`Project with ID ${id} not found`);
        }
        console.log(`Deleted project with ID: ${id} using admin key`);
        return deletedProject;
      } catch (error) {
        console.error(`Error deleting project with key and ID: ${id}`, error);
        throw new Error("Failed to delete project. Please try again later.");
      }
    },

};





  
