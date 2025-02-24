import { useMutation } from '@apollo/client';
import { GET_CLOUDINARY_SIGNATURE } from '../graphql/mutations/upload';
import { uploadToCloudinary } from '../lib/cloudinaryUpload';


export const useMediaUpload = () => {
  const [getSignature] = useMutation(GET_CLOUDINARY_SIGNATURE);

  const uploadMedia = async (file: File) => {
    const { data } = await getSignature();
    if (!data?.getCloudinarySignature) {
      throw new Error("Failed to get Cloudinary signature");
    }
    return await uploadToCloudinary(file, data.getCloudinarySignature);
  };

  return { uploadMedia };
};