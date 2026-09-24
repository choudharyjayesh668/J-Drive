const Folder = require("../models/folder");

const createFolder = async (req, res) => {
  try {
    const createFolder = req.body;
    const newFolder = new Folder({
      folderName: createFolder.name
    });
    await newFolder.save();
    // console.log("Folder Created");
    res.status(201).json({
      message: "Folder Has Been Created",
      folder: newFolder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Folder Failed To Create - Internal Server Error"
    });
  }
};
module.exports = {
  createFolder
};