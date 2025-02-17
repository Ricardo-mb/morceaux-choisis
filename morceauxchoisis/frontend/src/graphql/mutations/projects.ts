import { gql } from "@apollo/client";


export const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!, $file: Upload!) {
    createProject(project: $project, file: $file) {
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

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;
