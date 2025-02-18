

import { PROJECT_STATUS } from "../../config/constants.js";

export const projectTypeDefs = `#graphql

"scalar Upload"


  enum ProjectStatus {
    ${Object.values(PROJECT_STATUS).join(" ")} 
  }

  

  type User {
    id: ID!
    name: String!
    isAdmin: Boolean!
   
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    imageUrl: String
    projectUrl: String!
    status: ProjectStatus!
    createdAt: String!
    # createdBy: User!
  }

  input ProjectFilters {
    status: String
    name: String
  }

  input ProjectInput { 
    name: String!
    description: String!
    image: Upload
    projectUrl: String!
    status: ProjectStatus
  }

  type Query {
    projects(filters: ProjectFilters): [Project]
    project(id: ID!): Project
  }

  type Mutation {
    createProject(project: ProjectInput!): Project
    updateProject(id: ID!, project: ProjectInput!): Project
    deleteProject(id: ID!): Project
  }
`;
