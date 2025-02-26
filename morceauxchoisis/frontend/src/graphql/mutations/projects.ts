import { gql } from "@apollo/client";


export const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      id
      name
      description
      projectUrl
      status
      imageUrl
      createdAt
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $project: ProjectInput!) {
    updateProject(id: $id, project: $project) {
      id
      name
      description
      status
      startDate
      endDate
      createdAt
      updatedAt
    }
  }
`;

// export const DELETE_PROJECT = gql`
//   mutation DeleteProject($id: ID!) {
//     deleteProject(id: $id) {
//       id
//       name
//     }
//   }
// `;

export const DELETE_PROJECT_WITH_KEY = gql`
  mutation DeleteProjectWithKey($id: ID!, $adminKey: String!) {
    deleteProjectWithKey(id: $id, adminKey: $adminKey) {
      id
      name
    }
  }
`;
