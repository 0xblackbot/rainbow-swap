import TelegramBot from "node-telegram-bot-api";
import { TELEGRAM_BOT_API_TOKEN, WEB_APP_URL } from "./environment";

const bot = new TelegramBot(TELEGRAM_BOT_API_TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    await bot.sendMessage(chatId, "Welcome to the bot", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Open our telegram mini app",
              web_app: { url: WEB_APP_URL },
            },
          ],
        ],
      },
    });
  } else {
    bot.sendMessage(chatId, "Received your message");
  }
});
