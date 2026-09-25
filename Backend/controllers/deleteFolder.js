const Folder = require("../models/folder");

const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    await Folder.deleteOne({
      _id: id,
      owner: req.userId,
    });
    res.status(200).json({
      message: "Folder deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: `Failed To Delete ${error.message}`,
    });
  }
};
module.exports = {
  deleteFolder,
};