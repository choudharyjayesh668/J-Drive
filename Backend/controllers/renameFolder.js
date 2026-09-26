const Folder = require("../models/folder");

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

module.exports = {
  renameFolder,
};