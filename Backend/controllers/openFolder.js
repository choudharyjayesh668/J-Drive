const Folder = require("../models/folder");

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

module.exports = {
  openFolder,
};