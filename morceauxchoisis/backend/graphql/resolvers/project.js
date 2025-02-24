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

};





  
