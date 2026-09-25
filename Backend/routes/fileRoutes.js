const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({dest: "uploads/",});

const verifyToken = require("../middleware/verifyToken");

const {uploadFile,getFiles,} = require("../controllers/fileController");

router.post("/uploadFile/:folderId",verifyToken,upload.array("files"),uploadFile);
router.get("/folder/:folderId/files",verifyToken,getFiles);

module.exports = router;