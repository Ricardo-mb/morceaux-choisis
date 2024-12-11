import { uploadToCloudinary } from "../../utils/fileUpload.js";

export const fileUploadResolvers = {
  Mutation: {
    uploadFile: async (_, { file }) => {
      const optimizationOptions = {
        folder: "portfolio",
        transformation: [
          { width: 1200, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      };

      const fileUrl = await uploadToCloudinary(file, optimizationOptions);
      return fileUrl;
    },

    uploadProjectImage: async (_, { projectId, file }, { userId }) => {
      // Verify user authentication
      if (!userId) {
        handleError(ERROR_MESSAGES.UNAUTHENTICATED, "UNAUTHENTICATED");
      }

      const fileUrl = await uploadToCloudinary(file);

      // Update project with new image URL
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { imageUrl: fileUrl },
        { new: true },
      );

      return updatedProject;
    },
  },
};
