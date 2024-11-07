import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file, options = {}) => {
  const { createReadStream } = await file;
  const stream = createReadStream();

  // Default optimization settings
  const optimizationOptions = {
    folder: "portfolio",
    transformation: [
      { width: 1200, crop: "limit" }, // Max width
      { quality: "auto" }, // Automatic quality optimization
      { fetch_format: "auto" }, // Auto select best format (WebP when supported)
    ],
    ...options,
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      optimizationOptions,
      (error, result) => {
        if (error) reject(error);
        resolve(result.secure_url);
      }
    );
    stream.pipe(uploadStream);
  });
};
