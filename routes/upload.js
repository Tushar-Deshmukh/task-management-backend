const express = require('express');
const router = express.Router();

const {upload,uploadImage} = require("../controllers/upload");

router.post("/upload-image", upload.single("image"), uploadImage);

module.exports = router;