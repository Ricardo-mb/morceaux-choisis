import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// /************* *************************************************  *************/
//   /**
//    * Uploads a file to Cloudinary using streams.
//    * @param {File} file The file to upload.
//    * @param {Object} [options] Optional settings.
//    * @property {string} [options.folder] The cloudinary folder to upload to.
//    * @property {number} [options.max_file_size] The maximum allowed file size in bytes.
//    * @property {string[]} [options.allowed_formats] The allowed file formats.
//    * @property {Object[]} [options.transformation] The transformations to apply to the image.
//    * @returns {Promise<Object>} A promise that resolves with the uploaded image data.
//    * @fulfil {Object} The uploaded image data.
//    * @property {string} url The public URL of the image.
//    * @property {string} publicId The cloudinary public ID of the image.
//    * @property {string} format The format of the image.
//    * @property {number} width The width of the image.
//    * @property {number} height The height of the image.
//    */
// /******  *****************************************************  *************/
// export const uploadToCloudinary = async (file, options = {}) => {
//   const { createReadStream } = await file;
//   const stream = createReadStream();

//   const defaultOptions = {
//     folder: "portfolio",
//     transformation: [
//       { width: 1200, crop: "limit" },
//       { quality: "auto" },
//       { fetch_format: "auto" },
//     ],
//     resource_type: "auto",
//     allowed_formats: ["jpg", "png", "gif", "webp"],
//     max_file_size: 10000000 // 10MB
//   };

//   const uploadOptions = { ...defaultOptions, ...options };

//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.v2.uploader.upload_stream(
//       uploadOptions,
//       (error, result) => {
//         if (error) reject(error);
//         resolve({
//           url: result.secure_url,
//           publicId: result.public_id,
//           format: result.format,
//           width: result.width,
//           height: result.height
//         });
//       }
//     );
//     stream.pipe(uploadStream);
//   });
// };

// export const uploadToCloudinary = async (file) => {
//   try {
//     const { createReadStream, mimetype } = await file;
//     const stream = createReadStream();

//     return new Promise((resolve, reject) => {
//       const uploadStream = cloudinary.v2.uploader.upload_stream(
//         {
//           folder: "portfolio",
//           resource_type: "image",
//           allowed_formats: ["jpg", "png", "webp"],
//           transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
//         },
//         (error, result) => {
//           if (error) return reject(error);
//           resolve(result.secure_url);
//         }
//       );

//       stream.pipe(uploadStream);
//     });
//   } catch (error) {
//     throw new Error("Cloudinary Upload Error: " + error.message);
//   }
// };

// export const uploadToCloudinary = async (file, signature) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('api_key', signature.apiKey);
//   formData.append('timestamp', signature.timestamp);
//   formData.append('signature', signature.signature);
//   formData.append('folder', 'portfolio');
  
//   const response = await fetch(`https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`, {
//     method: 'POST',
//     body: formData
//   });
  
//   const data = await response.json();
//   if(data.secure_url){
//     return {secure_url: data.secure_url};
//   }else{
//     throw new Error(data.error.message || "Cloudinary Upload Error");
//   }
// };

export const uploadToCloudinary = async (file, signature) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", signature.apiKey);
  formData.append("timestamp", signature.timestamp);
  formData.append("signature", signature.signature);
  formData.append("folder", "portfolio");
  
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${signature.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.secure_url) {
      throw new Error("Invalid response from Cloudinary: Missing secure_url");
    }

    return { secure_url: data.secure_url };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary. Check network and API configuration.");
  }
};
export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.v2.uploader.destroy(publicId);
};