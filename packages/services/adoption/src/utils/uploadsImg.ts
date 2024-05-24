import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// In-memory storage for uploaded files
const hashCache = new Set();

const uploadsImg = async (req, res, _next) => {
  // Validate image dimensions and file type
  const imageFilter = function (_req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
      return cb(new Error("Only JPG files are allowed!"), false);
    }
    cb(null, true);
  };

  // Set up Multer for file upload
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, path.join(__dirname, "../../public/uploads"));
    },
    filename: function (_req, file, cb) {
      const timestamp = Date.now().toString();
      const filename = `${timestamp}_${file.originalname}`;
      cb(null, filename);
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 1024 * 1024 * 2, // Limits file size to 2MB
    },
  }).single("file");

  // Handle file upload
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      res.status(500).json({
        status: "error",
        message: "Multer error occurred",
      });
    } else if (err) {
      // An unknown error occurred when uploading
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    } else {
      // // Validate image dimensions here
      // const { width, height } = req.file;
      // const imageDimensions = [300, 300];

      // if (width !== imageDimensions[0] || height !== imageDimensions[1]) {
      //   // Delete the file as it does not meet the required dimensions
      //   fs.unlinkSync(req.file.path);

      //   return res.status(400).json({
      //     status: "error",
      //     message: `Image dimensions should be ${imageDimensions[0]}x${imageDimensions[1]}`,
      //   });

      // calculate hash of the uploaded file
      const hash = crypto
        .createHash("md5")
        .update(fs.readFileSync(req.file.path))
        .digest("hex");

      const hashExists = hashCache.has(hash);

      if (hashExists) {
        fs.unlinkSync(req.file.path);
        return res.status(400).json({
          status: "error",
          message: "File already exists",
        });
      }

      // add hash to cache
      hashCache.add(hash);

      return res.status(200).json({
        status: "error",
        message: "File uploaded successfully",
      });
    }

    // Image dimensions are valid
    // File uploaded successfully
  });
};

export default uploadsImg;
