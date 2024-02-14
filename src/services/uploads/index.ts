import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { FOLDERS } from "../../constants/storage.constant";
import ENV from "../../constants/env.constant";
import respond from "../../utils/respond";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,

  params: {
    folder: FOLDERS.uploads,
    allowedFormats: ["jpg", "png"],
    format: (req, file) => "png",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    public_id: (req: any, file) => `profilepic_${req.user._id}`,
  },
} as any);

// ${file.filename}${Math.round((Math.random() * 1000 + Math.random() * 10000) * Math.random() * 10000)}

// Create a reusable middleware function for handling file uploads:
export const useUploadprofilePic = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB size limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
}).single("profilePic");

export const useFileUploadErrorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.log(err);
    if (err.code === "LIMIT_FILE_SIZE")
      return respond(res, 400, "File size exceeded it's limit");

    return respond(res, 400, "Error occurred while uploading files");
  }

  next(err);
};

export default cloudinary;
