
import { gql } from '@apollo/client';


export const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
        createUser(input: $input) {
            id
            name
            email
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
        updateUser(id: $id, input: $input) {
            id
            name
            email
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
            success
            message
        }
    }
`;

export const RESET_PASSWORD = gql`
    mutation ResetPassword($email: String!) {
        resetPassword(email: $email) {
            success
            message
        }
    }
`;
