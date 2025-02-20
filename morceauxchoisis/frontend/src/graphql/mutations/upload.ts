import { gql } from '@apollo/client';

export const GET_SIGNED_URL = gql`
  mutation GetSignedUrl($filename: String!, $contentType: String!) {
    getSignedUrl(filename: $filename, contentType: $contentType) {
      url
      fields
    }
  }
`;
