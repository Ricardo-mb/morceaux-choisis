import { userTypeDefs } from "./user.js";
import { projectTypeDefs } from "./project.js";
import { mediaTypeDefs } from "./media.js";

export const typeDefs = `#graphql
  ${userTypeDefs}
  ${projectTypeDefs}
  ${mediaTypeDefs}
`;
