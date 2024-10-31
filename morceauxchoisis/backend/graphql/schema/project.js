export const projectTypeDefs = `#graphql
  type Project {
    id: ID!
    name: String!
    description: String!
    imageUrl: String!
    projectUrl: String!
    status: String!
  }

  input ProjectFilters {
    status: String
    name: String
  }

  input ProjectInput {
    name: String!
    description: String!
    imageUrl: String!
    projectUrl: String!
    status: String!
  }

  input UpdateProjectInput {
    name: String
    description: String
    imageUrl: String
    projectUrl: String
    status: String
  }

  type Query {
    projects(filters: ProjectFilters): [Project]
    project(id: ID!): Project
  }
`;
