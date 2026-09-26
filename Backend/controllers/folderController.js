const Folder = require("../models/folder");

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
module.exports = {
  createFolder
};