const Folder = require("../models/folder");

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

module.exports = showingAllFolder;