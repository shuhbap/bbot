const {
  Function,
  command,
  qrcode,
  webp2mp4,
  isPublic,
  isUrl,
  isPrivate,
  getJson,
  getUrl,
  getBuffer,
  isIgUrl,
  findMusic,
} = require("../lib/");

const { search } = require("yt-search");
const yts = require("yt-search");
const ytdl = require('ytdl-core');
const { toAudio } = require("../lib/media");
let gis = require("g-i-s");
const { AddMp3Meta } = require("../lib");
const fetch = require("node-fetch")
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
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb
const ffmpeg = require("fluent-ffmpeg");


async function gimage(query, amount = 5) {
  let list = [];
  return new Promise((resolve, reject) => {
    gis(query, async (error, result) => {
      for (
        var i = 0;
        i < (result.length < amount ? result.length : amount);
        i++
      ) {
        list.push(result[i].url);
        resolve(list);
      }
    });
  });
}

command(
  {
    pattern: "img",
    fromMe: isPrivate,
    desc: "Google Image search",
    type: "downloader",
  },
  async (message, match) => {
    if (!match) return await message.reply("_Enter a Image Name_");
    let [query, amount] = match.split(",");
    let result = await gimage(query, amount);
    await message.reply(
      `_Downloading ${amount || 5} images for ${query}_`
    );
    for (let i of result) {
      await message.sendFromUrl(i,{quoted: message});
    }
  }
);


command(
  {
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(message.jid,buff, {quoted: message}, "image");
  }
);

command(
  {
    pattern: "mp4",
    fromMe: isPrivate,
    desc: "Changes sticker to Video",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    let buffer = await webp2mp4(buff);
    return await message.sendMessage(message.jid,buff, {quoted: message}, "video");
  }
);

/* Copyright (C) 2022 SUHAID-BRO.
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
Afiya-md
*/




/*command(
  {
    pattern: "song",
    fromMe: isPrivate,
    desc: "Play Song",
    type: "downloader",
  },
  async (message, match,m) => {
if (!match) return await message.reply(`*_Enter name or link!_*`)
            let search = await yts(match);
            let anu = search.videos[0];
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            let infoYt = await ytdl.getInfo(anu.url);
            if (infoYt.videoDetails.lengthSeconds >= videotime) return message.reply(`_ Video file too big!_`);
            let titleYt = infoYt.videoDetails.title;
          let randomName = getRandom(".mp3");
let img = await getBuffer(anu.thumbnail);
await message.client.sendMessage(message.jid,{ text : `

*_𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 : ${titleYt}_*

`}, {quoted: m});
            
            const stream = ytdl(anu.url, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./media/${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./media/${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let buttonMessage = {
                    audio: fs.readFileSync(`./media/${randomName}`),
                    contextInfo: { externalAdReply: {
 title: `Play Now : ${titleYt}`,
body: `${message.pushName}`,
sourceUrl: anu.url,
mediaUrl: anu.url,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: true,
thumbnailUrl: anu.thumbnail }},
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    
                }
                await message.client.sendMessage(message.jid, buttonMessage,{ quoted: m})
                return fs.unlinkSync(`./media/${randomName}`);
            } else {
                message.reply(`_ File size bigger than 100mb_`);
            }
            fs.unlinkSync(`./media/${randomName}`)});*/



    

command(
  {
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/audio/voice to mp3",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message || (!message.reply_message.video && !message.reply_message.audio)) return await message.reply('_Reply at audio/voice/video!!_')  
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
    return await message.sendMessage(message.jid,buff, { mimetype: "audio/mpeg", quoted: message }, "audio");
  }
);

