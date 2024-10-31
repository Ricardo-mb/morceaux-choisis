export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
    isAdmin: Boolean!
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
`;
