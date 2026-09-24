const Folder = require("../models/folder");

const renameFolder = async (req,res)=>{
    try{
    const {id} = req.params;
    const {folderName} = req.body;
    const foundFolder = await Folder.findOne({_id: id});
    if (!foundFolder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }
    foundFolder.folderName=folderName;
    await foundFolder.save();
    res.status(200).json({
      message: "Folder renamed successfully",
      data: foundFolder,
    });
  }catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

module.exports = {
  renameFolder,
};