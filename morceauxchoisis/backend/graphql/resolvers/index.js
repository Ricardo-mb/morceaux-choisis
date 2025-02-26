import { userResolvers } from "./user.js";
import { projectResolvers } from "./project.js";


export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...projectResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...projectResolvers.Mutation,
   
  },
};
