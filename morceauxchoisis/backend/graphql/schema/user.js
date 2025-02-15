export const userTypeDefs = `#graphql
type ResetPasswordPayload {
  success: Boolean!
  message: String!
}
input ResetPasswordInput{
  email: String!
  token: String!
  newPassword: String!
}

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: String
    createdAt: String!
    updatedAt: String!
    isAdmin: Boolean!
    accountStatus: String
    loginCount: Int
    skills: [String]
  }


  input UserInput {
    name: String!
    email: String!
    password: String!
    isAdmin: Boolean!
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
    role: String
    isAdmin: Boolean
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
    loginMutation(email: String!, password: String!): AuthPayload!
    registerMutation(input: UserInput!): AuthPayload!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    updateAdminPassword(email: String!, newPassword: String!): AuthPayload!
    updateUserPassword(email: String!, newPassword: String!): AuthPayload!
    deleteUser(id: ID!): Boolean!
    requestPasswordReset(email: String!): ResetPasswordPayload!
    resetPassword(input: ResetPasswordInput!): AuthPayload!
  }


  scalar  Upload

  extend type Mutation {
    uploadFile(file: Upload!): String!
    updateUserAvatar(file: Upload!): String!
    uploadProjectImage(file: Upload!, projectId: ID!): String!
    deleteUserAvatar: Boolean!
  }
`;
