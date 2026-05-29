const config = require("../config");
const { command, isPrivate, getJson, sleep, tiny } = require("../lib/");
const { Image } = require("node-webpmux");




command(
  {
    pattern: "sticker",
    fromMe: isPrivate,
    desc: "Converts Photo or video to sticker",
    type: "converter",
  },
  async (message, match, m) => {
    if (!(message.reply_message.video || message.reply_message.image))
      return await message.reply("_Reply to photo or video_");
    let buff = await m.quoted.download();
    await message.sendMsg(buff,
      { packname: config.STICKER_DATA.split(';')[0], author: config.STICKER_DATA.split(';')[1], quoted: message },
      "sticker"
    );
  }
);

command(
  {
    pattern: "tgs",
    fromMe: isPrivate,
    desc: "Download Sticker From Telegram",
    type: "tool",
  },
  async (message, match) => {
    if (!match)
      return message.reply(
        "_Enter a tg sticker url_\nEg: https://t.me/addstickers/Oldboyfinal\nKeep in mind that there is a chance of ban if used frequently"
      );
    let packid = match.split("/addstickers/")[1];
    let { result } = await getJson(
      `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(
        packid
      )}`
    );
    if (result.is_animated)
      return message.reply("_Animated stickers are not supported_");
    message.reply(
      `*Total stickers :* ${result.stickers.length}\n*Estimated complete in:* ${
        result.stickers.length * 1.5
      } seconds`.trim()
    );
    for (let sticker of result.stickers) {
      let file_path = await getJson(
        `https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${sticker.file_id}`
      );
      await message.sendMsg(`https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${file_path.result.file_path}`,
        { packname: config.STICKER_DATA.split(';')[0], author: config.STICKER_DATA.split(';')[1], quoted: message },
      "sticker"
      );
      sleep(1500);
    }
  }
);


command(
  {
    pattern: "take",
    fromMe: isPrivate,
    desc: "Changes Exif data of stickers",
    type: "tool",
  },
  async (message, match, m) => {
    if (!message.reply_message && !message.reply_message.sticker);
    let buff = await m.quoted.download();
    let [packname, author] = match.split(";");
    await message.sendMsg(buff,
      {
        packname: packname || config.STICKER_DATA.split(';')[0],
        author: author || config.STICKER_DATA.split(';')[1], quoted: message },
      "sticker"
    );
  }
);

command(
  {
    pattern: "getexif",
    fromMe: true,
    desc: "description",
    type: "type",
  },
  async (message, match, m) => {
    if (!message.reply_message || !message.reply_message.sticker)
      return await message.reply("_Reply to sticker_");
    let img = new Image();
    await img.load(await m.quoted.download());
    const exif = JSON.parse(img.exif.slice(22).toString());
    await message.reply(exif);
  }
);
