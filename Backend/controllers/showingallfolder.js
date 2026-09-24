const Folder = require("../models/folder");

const showingAllFolder = async (req, res) => {
  try {
    const allFolders = await Folder.find({});

    res.status(200).json({
      message: "Folder Loaded",
      data: allFolders,
    });
  } catch (error) {
    res.status(500).json({
      message: `Folder Failed To Load ${error.message}`,
    });
  }
};

module.exports = showingAllFolder;