import cloudinary from "cloudinary";

export const uploadMedia = async (file, type, projectId) => {
  const { createReadStream } = await file;
  const stream = createReadStream();

  const uploadOptions = {
    folder: `portfolio/${type.toLowerCase()}`,
    resource_type: type === "VIDEO" ? "video" : "auto",
    transformation: getTransformationsByType(type),
  };

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      uploadOptions,
      (error, result) => {
        if (error) reject(error);
        resolve({
          url: result.secure_url,
          type,
          projectId,
          createdAt: new Date().toISOString(),
        });
      },
    );
    stream.pipe(uploadStream);
  });
};

const getTransformationsByType = (type) => {
  switch (type) {
    case "VIDEO":
      return [{ quality: "auto" }, { format: "mp4" }];
    case "GIF":
      return [{ quality: "auto" }, { format: "gif" }];
    case "PDF":
      return [{ format: "pdf" }];
    default:
      return [
        { width: 1200, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ];
  }
};
