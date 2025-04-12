import multer from "multer";

// Temporary local storage before Cloudinary upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Temporary folder (cleaned after Cloudinary upload)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({ storage });

export default upload;
