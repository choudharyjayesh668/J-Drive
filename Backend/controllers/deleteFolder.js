const Folder = require("../models/folder");
const File = require("../models/files");
const axios = require("axios");
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
    for (const file of files) {
        try {
            await axios.post(
                `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/deleteMessage`,
                {
                    chat_id: process.env.TELEGRAM_CHANNEL_ID,
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