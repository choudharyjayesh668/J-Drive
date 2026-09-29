const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB
  },
});

const verifyToken = require("../middleware/verifyToken");
const telegramConfig = require("../middleware/telegramConfig");
const {uploadFile,getFiles,deleteFile,viewFile,downloadFile} = require("../controllers/fileController");

router.post("/uploadFile/:folderId",verifyToken,telegramConfig,upload.array("files"),uploadFile);
router.get("/folder/:folderId/files",verifyToken,telegramConfig,getFiles);
router.delete("/file/:fileId",verifyToken,telegramConfig,deleteFile);
router.get("/files/:fileId/view", verifyToken,telegramConfig,viewFile);
router.get("/files/:fileId/download",verifyToken,telegramConfig,downloadFile);

module.exports = router;