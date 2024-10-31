import { userTypeDefs } from "./user.js";
import { projectTypeDefs } from "./project.js";

export const typeDefs = `#graphql
  ${userTypeDefs}
  ${projectTypeDefs}
`;
