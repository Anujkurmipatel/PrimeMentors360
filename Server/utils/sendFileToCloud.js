// Dummy util for file upload. Replace with your actual cloud upload logic (Cloudinary, S3, etc.)
module.exports.uploadToCloud = async (file) => {
  // Simulate upload and return a mock URL and public_id
  return {
    secure_url: `/uploads/${file.filename}`,
    public_id: file.filename,
  };
};
