const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({dest: "uploads/",});

const verifyToken = require("../middleware/verifyToken");

const {uploadFile,getFiles,deleteFile,viewFile,downloadFile} = require("../controllers/fileController");

router.post("/uploadFile/:folderId",verifyToken,upload.array("files"),uploadFile);
router.get("/folder/:folderId/files",verifyToken,getFiles);
router.delete("/file/:fileId",verifyToken,deleteFile);
router.get("/files/:fileId/view", verifyToken, viewFile);
router.get("/files/:fileId/download",verifyToken,downloadFile);

module.exports = router;