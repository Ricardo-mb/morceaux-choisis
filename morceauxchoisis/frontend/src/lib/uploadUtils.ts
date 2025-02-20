export async function uploadFileWithSignedUrl(file: File, signedUrl: string, fields: Record<string, string>) {
  const formData = new FormData();
  
  // Add the signed URL fields
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });
  
  // Add the file last
  formData.append('file', file);

  const response = await fetch(signedUrl, {
    method: 'POST',
    body: formData,
  });

  return response.ok;
}
