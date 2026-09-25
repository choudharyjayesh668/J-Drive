const Folder = require("../models/folder");

const openFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const folder = await Folder.findOne({_id: id,owner: req.userId});
    if (!folder) {
      return res.status(404).json({
        message: "Folder not found",
      });
    }
    res.status(200).json({
      message: "Folder opened successfully",
      folder,
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed To Open Folder ${error.message}`,
    });
  }
};

module.exports = {
  openFolder,
};