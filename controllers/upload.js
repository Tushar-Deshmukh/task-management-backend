const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

/**
 * @swagger
 * /api/upload-image:
 *   post:
 *     summary: Upload an image to Cloudinary
 *     tags:
 *       - Uploads
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 url:
 *                   type: string
 *                   description: The Cloudinary URL of the uploaded image
 *       400:
 *         description: Bad Request (e.g., no file uploaded, invalid file type)
 *       500:
 *         description: Internal Server Error
 */

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "images", // Optional folder
    });

    return res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Export multer upload for use in the route
exports.upload = upload;
