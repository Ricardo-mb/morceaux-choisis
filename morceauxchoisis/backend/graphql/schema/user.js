export const userTypeDefs = `#graphql
  type SocialLinks {
    github: String
    linkedin: String
    twitter: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String!
    updatedAt: String!
    isAdmin: Boolean!
    role: String!
    avatar: String
    bio: String
    skills: [String]
    socialLinks: SocialLinks
  }

  input SocialLinksInput {
    github: String
    linkedin: String
    twitter: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
    avatar: String
    bio: String
    skills: [String]
    socialLinks: SocialLinksInput
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    avatar: String
    bio: String
    skills: [String]
    socialLinks: SocialLinksInput
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload!
    register(input: UserInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    updateAdminPassword(email: String!, newPassword: String!): AuthPayload!
    updateUserPassword(email: String!, newPassword: String!): AuthPayload!
    deleteUser(id: ID!): Boolean!
  }


  scalar  Upload

  extend type Mutation {
    uploadFile(file: Upload!): String!
    updateUserAvatar(file: Upload!): String!
    uploadProjectImage(file: Upload!, projectId: ID!): String!
    deleteUserAvatar: Boolean!
  }
`;
