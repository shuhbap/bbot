const { command, qrcode, isUrl, isPrivate, findMusic } = require("../lib/");
const jimp = require("jimp");
const QRReader = require("qrcode-reader");
const { RMBG_KEY } = require("../config");
let { unlink } = require("fs/promises");
const got = require("got");
const FormData = require("form-data");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);
const fs = require("fs");
const { downloadMediaMessage }= require("@whiskeysockets/baileys");

command(
  {
    pattern: "qr",
    fromMe: isPrivate,
    desc: "Read/Write Qr.",
    type: "Tool",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (match) {
      let buff = await qrcode(match);
      return await message.client.sendMessage(message.jid,buff, {}, "image");
    } else if (!message.reply_message || !message.reply_message.image)
      return await message.sendMessage(
        "*Example : qr test*\n*Reply to a qr image.*"
      );

    const { bitmap } = await jimp.read(
      await message.reply_message.downloadMediaMessage()
    );
    const qr = new QRReader();
    qr.cvideosback = (err, value) =>
      message.client.sendMessage(message.jid,{text: err ?? value.result}, { quoted: message.data });
    qr.decode(bitmap);
  }
);

command(
  {
    pattern: "find",
    fromMe: isPrivate,
    desc: "find the replied music",
    type: "tools",
  },
  async (message, match, msg) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a audio or video_");
    let buff = await msg.quoted.download();
    let data = await findMusic(buff);
    if (!data.status) return message.reply(data);

    let ffind = `
  *ᴛɪᴛʟᴇ* : ${data.title}            
  *ᴀʀᴛɪꜱᴛ* : ${data.artists}            
  *ᴀʟʙᴜᴍ* : ${data.album}            
  *ɢᴇɴʀᴇꜱ* : ${data.genres}          
  *ʀᴇʟᴇᴀꜱᴇ* : ${data.release_date}
  `;
    await message.reply(ffind);
  }
);


command({
pattern: "vv",
fromMe: true,
desc: "View Once image/Video open",
type: "tools",
}, async(message,match , m) =>{
 
 const buffer = await downloadMediaMessage(m.quoted,
      "buffer",
      {},
      {
        reuploadRequest: message.client.updateMediaMessage,
      }
    );

return message.sendFile(buffer);
});

command(
  {
    pattern: "rmbg",
    fromMe: isPrivate,
    desc: "removes background of an image",
    type: "tool",
  },
  async (message) => {
    if (!message.reply_message || !message.reply_message.image)
      return await message.reply("_Reply to a photo_");
    if (RMBG_KEY === false)
      return await message.reply(
        `_Get a new api key from https://www.remove.bg/api_\n_set it via_\n_setvar RMBG_KEY: api key_`
      );

    await message.reply("_Removing Background_");
    var location = await message.reply_message.downloadMediaMessage();

    var form = new FormData();
    form.append("image_file", fs.createReadStream(location));
    form.append("size", "auto");

    var rbg = await got.stream.post("https://api.remove.bg/v1.0/removebg", {
      body: form,
      headers: {
        "X-Api-Key": RMBG_KEY,
      },
    });

    await pipeline(rbg, fs.createWriteStream("rbg.png"));

    await message.sendMessage(fs.readFileSync("rbg.png"), {}, "image");
    await unlink(location);
    return await unlink("rbg.png");
  }
);

command(
  {
    pattern: "short ?(.*)",
    fromMe: isPrivate,
    desc: "Converts Url to bitly",
    type: "tool",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match) return await message.reply("_Reply to a url or enter a url_");
    if (!isUrl(match)) return await message.reply("_Not a url_");
    let short = await Bitly(match);
    return await message.reply(short.link);
  }
);

command(
  {
    pattern: "spdf",
    fromMe: isPrivate,
    desc: "Converts Site to PDF.",
    type: "tool",
  },
  async (message, match) => {
    match = match || message.reply_message.text;
    if (!match || !isUrl(match)) return await message.reply("_Enter a URL_");

    let url = new URL(match);
    await message.sendFromUrl(
      `https://api.html2pdf.app/v1/generate?url=${match}&apiKey=begC4dFAup1b8LyRXxAfjetfqDg2uYx8PWmh9YJ59tTZXiUyh2Vs72HdYQB68vyc`,
      { fileName: `${url.origin}.pdf`, mimetype: "application/pdf" }
    );
  }
);
