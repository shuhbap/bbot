const { command, isPrivate, getJson } = require("../lib/");
const config = require("../config");
const fetch = require("node-fetch")


command({
    pattern: "gpt",
    fromMe: isPrivate,
    desc: "Open ai chat gpt",
    type: "openai",
  }, async (message, match, m) => {
await message.reply(`
_Afiya ChatGPT Down!🥲_
Please, Use Meta AI
`);
});
