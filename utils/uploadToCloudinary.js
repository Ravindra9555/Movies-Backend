// utils/uploadToCloudinary.js
import cloudinary from "./cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (localFilePath, folderName = "online-learning-platform") => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folderName,
      resource_type: "auto", // handles both image and video
    });

    // Delete file from local after uploading
    fs.unlinkSync(localFilePath);

    return result;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    fs.unlinkSync(localFilePath); // Delete failed upload file
    throw error;
  }
};

export default uploadToCloudinary;
