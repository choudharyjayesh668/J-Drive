const Folder = require("../models/folder");
const File = require("../models/files");
const axios = require("axios");
const createFolder = async (req, res) => {
  try {
    const createFolder = req.body;
    if(!createFolder.name || !createFolder.name.trim()){
      return res.status(400).json({
        success:false,
        message: "Folder name is required",
      });
    };
    const newFolder = new Folder({
      folderName: createFolder.name,
      owner: req.userId
    });
    await newFolder.save();
    res.status(201).json({
      success:true,
      message: "Folder Has Been Created",
      folder: newFolder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success:false,
      message: "Folder Failed To Create - Internal Server Error"
    });
  }
};
const showingAllFolder = async (req, res) => {
  try {
    const allFolders = await Folder.find({owner: req.userId});
    res.status(200).json({
      success:true,
      message: "Folder Loaded",
      data: allFolders,
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: `Folder Failed To Load - Internal Server Error`,
    });
  }
};
const renameFolder = async (req,res)=>{
    try{
    const {id} = req.params;
    const {folderName} = req.body;
    if (!folderName || !folderName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Folder name is required",
      });
    }
    const foundFolder = await Folder.findOne({_id: id,owner: req.userId});
    if (!foundFolder) {
      return res.status(404).json({
        success:false,
        message: "Folder not found",
      });
    };
    foundFolder.folderName=folderName.trim();
    await foundFolder.save();
    res.status(200).json({
      success:true,
      message: "Folder renamed successfully",
      data: foundFolder,
    });
  }catch (err) {
    console.error("Rename folder error:", err);
        res.status(500).json({
            success:false,
            message: err.message,
        });
    };
};
const openFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findOne({_id: id,owner: req.userId});
    if (!folder) {
      return res.status(404).json({
        success:false,
        message: "Folder not found",
      });
    }
    res.status(200).json({
      success:true,
      message: "Folder opened successfully",
      folder,
    });
  } catch (error) {
    console.error("Open folder error:", error);
    res.status(500).json({
      success:false,
      message: `Failed To Open Folder please try again`,
    });
  }
};
const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findOne({
      _id: id,
      owner: req.userId,
    });
    const files = await File.find({
      owner: req.userId,
      folder: id, 
    });
    if (!folder) {
      return res.status(404).json({
        success: false,
        message: "Folder not found",
      });
    }
    for (const file of files) {
        try {
            await axios.post(
                `https://api.telegram.org/bot${req.telegramBotToken}/deleteMessage`,
                {
                    chat_id: req.telegramChannelId,
                    message_id: file.messageId,
                }
            );
        } catch (err) {
            console.log(
                `Failed to delete Telegram message ${file.messageId}`
            );
        }
    }
    await File.deleteMany({
      owner: req.userId,
      folder: id,
    });
    await Folder.deleteOne({
      owner: req.userId,
      _id: id,
    });
    res.status(200).json({
      success: true,
      message: "Folder deleted successfully",
    });
  } catch (error) {
    console.log("Delete folder error:", error);
    res.status(500).json({
      success: false,
      message: `Failed To Delete ${error.message}`,
    });
  }
};
module.exports = {
  createFolder,
  showingAllFolder,
  renameFolder,
  openFolder,
  deleteFolder,
};