const { Bot } = require("node-telegram-bot-api");

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN);

module.exports = bot;