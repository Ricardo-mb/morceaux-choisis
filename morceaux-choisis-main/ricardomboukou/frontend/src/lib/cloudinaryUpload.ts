interface CloudinarySignature {
  apiKey: string;
  cloudName: string;
  signature: string;
  timestamp: string;
}   



export const uploadToCloudinary = async (file: File, signature: CloudinarySignature) => {
  if (!file || !signature) {
    throw new Error("File and signature are required for uploading.");
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('api_key', signature.apiKey);
  formData.append('timestamp', signature.timestamp);
  formData.append('signature', signature.signature);
//   formData.append('public_id', file.name);
  formData.append('folder', 'portfolio');

  try {
    console.log("Signature : ", signature);

     // Log FormData contents
    console.log("FormData Contents:");
    for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${signature.cloudName}/upload`;
    console.log(`Upload link *** :${uploadUrl}`);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
      }
    });

    if (!response.ok) {
      throw new Error(`Upload failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Result from creating page *** : ", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Error during upload to Cloudinary:", error);
    throw error;
  }
};
