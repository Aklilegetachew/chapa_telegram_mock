const express = require("express");
const router = express.Router();
const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
// Use the Helmet middleware to set the Content-Security-Policy header

router.get("/", (req, res) => {
  const bot = new Telegraf(TOKEN);
  bot.launch({
    webhook: {
      // Public domain for webhook; e.g.: example.com
      domain: WEBHOOK,

      // Port to listen on; e.g.: 8080
      port: PORT,

      // Optional path to listen for.
      // `bot.secretPathComponent()` will be used by default
      path: THISISTH,

      // Optional secret to be sent back in a header for security.
      // e.g.: `crypto.randomBytes(64).toString("hex")`
      secretToken: randomAlphaNumericString,
    },
  });
  bot.start((ctx) => ctx.reply("Welcome"));
  bot.on(message("Hello"), (ctx) => ctx.reply("👍"));
  bot.hears("hi", (ctx) => ctx.reply("Hey there"));
  bot.launch();

  // Enable graceful stop
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
  res.send("Hello World! With Node");
});
module.exports = router;
