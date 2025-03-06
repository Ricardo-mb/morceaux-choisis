export const mediaTypeDefs = `#graphql
  enum MediaType {
    IMAGE
    VIDEO
    PDF
    GIF
  }

  type Media {
    id: ID!
    url: String!
    type: MediaType!
    title: String
    projectId: ID
    createdAt: String!
  }

  extend type Mutation {
    uploadMedia(file: Upload!, type: MediaType!, projectId: ID): Media!
    deleteMedia(id: ID!): Boolean!
  }

  extend type Query {
    getProjectMedia(projectId: ID!): [Media]!
  }
`;
