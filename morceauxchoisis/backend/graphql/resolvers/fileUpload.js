import { uploadToCloudinary } from "../../utils/fileUpload.js";
import { Project } from "../../models/Project.js";

export const fileUploadResolvers = {
  Mutation: {
    uploadFile: async (_, { file }) => {
      const fileUrl = await uploadToCloudinary(file);
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
        { new: true }
      );

      return updatedProject;
    },
  },
};
