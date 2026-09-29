const User = require("../models/user");

const telegramConfig = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("telegramBotToken telegramChannelId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.telegramBotToken) {
      return res.status(400).json({
        message: "Telegram bot token not configured",
      });
    }
    if (!user.telegramChannelId) {
      return res.status(400).json({
        message: "Telegram Channel Id not configured",
      });
    }

    req.telegramBotToken = user.telegramBotToken;
    req.telegramChannelId = user.telegramChannelId;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to load Telegram configuration" });
  }
};

module.exports = telegramConfig;