import { gql } from '@apollo/client';

export const GET_SIGNED_URL = gql`
  mutation GetSignedUrl($filename: String!, $contentType: String!) {
    getSignedUrl(filename: $filename, contentType: $contentType) {
      url
      fields
    }
  }
`;
export const GET_CLOUDINARY_SIGNATURE = gql`
  mutation GetCloudinarySignature {
    getCloudinarySignature {
      signature
      apiKey
      cloudName
      timestamp
    }
  }
`;
