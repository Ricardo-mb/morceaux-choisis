import { userResolvers } from "./user.js";
import { projectResolvers } from "./project.js";
import { fileUploadResolvers } from "./fileUpload.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...projectResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...projectResolvers.Mutation,
    ...fileUploadResolvers.Mutation,
  },
};
