import { PROJECT_STATUS } from "../../config/constants.js";

export const projectTypeDefs = `#graphql

"scalar Upload"

  enum ProjectStatus {
    ${Object.values(PROJECT_STATUS).join(" ")} 
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    imageUrl: String!
    projectUrl: String!
    status: ProjectStatus!
    createdAt: String!
  }

  input ProjectFilters {
    status: String
    name: String
  }

  input ProjectInput {
    name: String!
    description: String!
    imageUrl: String
    projectUrl: String!
    status: ProjectStatus!
  }

  input UpdateProjectInput {
    name: String
    description: String
    imageUrl: String
    projectUrl: String
    status: ProjectStatus
  }

  type Query {
    projects(filters: ProjectFilters): [Project]
    project(id: ID!): Project
  }

  type CloudinarySignature{
    signature: String!
    timestamp: String!
    apiKey: String!
    cloudName: String!
  }

  type Mutation {
    getCloudinarySignature: CloudinarySignature!
    createProject(project: ProjectInput!): Project
    updateProject(id: ID!, project: UpdateProjectInput!): Project
    # deleteProject(id: ID!): Project
    deleteProjectWithKey(id: ID!, adminKey: String): Project
  }
`;
