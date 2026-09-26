const File = require("../models/files");
const fs = require("fs");
const FormDataPackage = require("form-data");
const axios = require("axios");
const path = require("path");

const uploadFile = async (req, res) => {
  const { folderId } = req.params;
  try {
    if (!folderId) {
      return res.status(400).json({
        success: false,
        message: "Folder ID is required",
      });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files selected",
      });
    }
    for (const file of req.files) {
      const fileBuffer = fs.readFileSync(file.path);
      const formData = new FormDataPackage();
      formData.append("document", fileBuffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
      formData.append(
        "chat_id",
        process.env.TELEGRAM_CHANNEL_ID
      );
      const response = await axios.post(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendDocument`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      );
      const telegramFileId =
        response.data.result.document?.file_id;
      const newFile = new File({
        fileName: file.originalname,
        telegramFileId: telegramFileId,
        messageId: String(response.data.result.message_id),
        mimeType: file.mimetype,
        owner: req.userId,
        folder: folderId,
      });
      await newFile.save();
    }
    return res.status(201).json({
      success: true,
      message: "All files uploaded successfully",
    });
  } catch (error) {
    console.error("Upload file error:", error);
    return res.status(500).json({
      success: false,
      message: "Upload failed. Please try again.",
    });
  }
};
const getFiles = async (req, res) => {
  const { folderId } = req.params;
  try {
    const files = await File.find({
      owner: req.userId,
      folder: folderId,
    });
    return res.status(200).json({
      success: true,
      message: "Files Loaded",
      data: files,
    });
  } catch (error) {
    console.error("Fetch files error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch files. Please try again.",
    });
  }
};
const deleteFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({
      _id: fileId,
      owner: req.userId,
    });
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    await axios.post(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/deleteMessage`,
      {
        chat_id: process.env.TELEGRAM_CHANNEL_ID,
        message_id: file.messageId,
      }
    );
    await file.deleteOne();
    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete file error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete file. Please try again.",
    });
  }
};
const viewFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({
      _id: fileId,
      owner: req.userId,
    });
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    const response = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile`,
      {
        params: {
          file_id: file.telegramFileId,
        },
      }
    );
    const filePath = response.data.result.file_path;
    const telegramUrl =
      `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;
    const telegramResponse = await axios.get(telegramUrl, {
      responseType: "stream",
    });
    const ext = path.extname(file.fileName).toLowerCase();
    const mimeTypes = {
      ".pdf": "application/pdf",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".mp3": "audio/mpeg",
    };
    res.setHeader(
      "Content-Type",
      mimeTypes[ext] || "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${file.fileName}"`
    );
    telegramResponse.data.pipe(res);
  } catch (error) {
    console.error("Preview failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to preview file. Please try again.",
    });
  }
};
const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findOne({
      _id: fileId,
      owner: req.userId,
    });
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    const response = await axios.get(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile`,
      {
        params: {
          file_id: file.telegramFileId,
        },
      }
    );
    const filePath = response.data.result.file_path;
    const telegramUrl =
      `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${filePath}`;
    const telegramResponse = await axios.get(telegramUrl, {
      responseType: "stream",
    });
    res.setHeader(
      "Content-Type",
      telegramResponse.headers["content-type"] ||
        "application/octet-stream"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${file.fileName}"`
    );
    telegramResponse.data.pipe(res);
  } catch (error) {
    console.error("Download failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to download file. Please try again.",
    });
  }
};
module.exports = {
  uploadFile,
  getFiles,
  deleteFile,
  viewFile,
  downloadFile,
};