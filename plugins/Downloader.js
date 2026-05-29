  const {
  command,  
  isPrivate,
  getJson,
  getBuffer,
  Function,
  PREFIX
} = require("../lib/");
const { youtube, yts }= require("../lib");

const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { spotifydl } = require('../lib/spotify');
const fetch = require("node-fetch");
let gis = require("g-i-s");
const axios = require("axios");



command(
  {
    pattern: "song",
    fromMe: isPrivate,
    desc: "download youtube song LINK",
    type: "downloader",
  },
  async (message, match,m) => {
  	 try{
if (!match) return await message.reply(`_Song nte per adikdaa..🤥_`)
            let yts = require("yt-search");
            let search = await yts(match);
            let anu = search.videos[0];
            
                     const res = await axios.get(`https://api-ij32.onrender.com/download?url=${anu.url}`);
      
            const audio = res.data.audio['320']; 

let bb = await (await fetch(audio)).arrayBuffer();

         await message.reply(`Ithalle ninte song??🤥...  ${res.data.title} `);
                let buttonMessage = {
                    audio: Buffer.from(bb),
                    contextInfo: { externalAdReply: {
title: ` ${res.data.title} `,
body: `Eyy ${message.pushName} ithalleee song?? 🤨`,
sourceUrl: " ",
mediaUrl: " ",
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: true,
thumbnailUrl: res.data.thumbnail }},
                    mimetype: 'audio/mpeg',
                    fileName: res.data.title + ".mp3",
                    
                }
                await message.client.sendMessage(message.jid, buttonMessage,{ quoted: m})
}catch(eee){
console.log(eee);
message.reply("_Eeyy Song onum ilaaa🙂... onnude nookk😌_");
}
});

/*command(
  {
    pattern: "yta",
    fromMe: isPrivate,
    desc: "download youtube song LINK",
    type: "downloader",
  },
  async (message, match,m) => {
  	let { key } = await message.reply(`*_Downloading_*`);
if (!match) return await message.reply(`*_Enter link!_*`)
            let yts = require("yt-search");
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
await new Promise(t => setTimeout(t,0))
         await message.client.sendMessage(message.jid,{ text : `

_Downloaded_ : ${titleYt}

`, edit: key }, {quoted: m});
            
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




/*command(
  {
    pattern: "song",
    fromMe: isPrivate,
    desc: "Downloads audio from YouTube.",
    type: "downloader",
  },
  async (message, match) => {
    try {
      match = match || message.reply_message.text;
      if (!match) return await message.reply("Give me a query");

      const results = await searchYT(match);
      let buttons = [];
      let sections = [];
      results.forEach((result) => {
        sections.push({
          title: result.title,
          rows: [
            {
              title: result.title,
              id: `${PREFIX}yta ${result.url}`,
            },
          ],
        });
      });
      
      buttons.push({
        type: "list",
        params: {
          title: 'select',
          sections: sections,
        },
      });

      let data = {
        jid: message.jid,
        button: buttons,
        header: {
          title: "",
          subtitle: "SONG DOWNLOADER",
          hasMediaAttachment: false,
        },
        footer: {
          text: "© ᴀꜰɪʏᴀ-ᴍᴅ",
        },
        body: {
          text: `YouTube search results for: ${match}`,
        },
      };
      await message.sendMessage(message.jid, data, {}, "interactive");
    } catch (error) {
      message.reply(error);
    }
  }
);*/






command(
  {
    pattern: "yta",
    fromMe: isPrivate,
    desc: "download youtube song LINK",
    type: "downloader",
  },
  async (message, match,m) => {
  	 try{
if (!match) return await message.reply(`_YouTube Video nte link thaa..😒`)
            let yts = require("yt-search");
            let search = await yts(match);
            let anu = search.videos[0];
            
                     const res = await axios.get(`https://api-ij32.onrender.com/download?url=${anu.url}`);
      
            const audio = res.data.audio['320']; 

let bb = await (await fetch(audio)).arrayBuffer();

         await message.reply(` Ithalle ninte song??🤥...  ${res.data.title} `);
                let buttonMessage = {
                    audio: Buffer.from(bb),
                    contextInfo: { externalAdReply: {
title: ` ${res.data.title} `,
body: ` Eyy ${message.pushName} ithalleee song?? 🤨 `,
sourceUrl: " ",
mediaUrl: " ",
mediaType: 1,
showAdAttribution: false,
renderLargerThumbnail: true,
thumbnailUrl: anu.thumbnail }},
                    mimetype: 'audio/mpeg',
                    fileName: res.data.title + ".mp3",
                    
                }
                await message.client.sendMessage(message.jid, buttonMessage,{ quoted: m})
}catch(eee){
console.log(eee);
message.reply("Error Aayi Onnude nokk...😌");
}
});



command(
  {
    pattern: "spotify",
    fromMe: isPrivate,  
    desc: "Spotify song Downloader",
    type: "downloader",
  },
  async (message, match) => {
try{
{
let { key } = await message.reply(`_Download akattee...!_`);
if (!match) return message.client.sendMessage(message.jid,{text: "Link Valid allaa..🤥"});
  const audioSpotify = await spotifydl(match.trim()).catch((err) => {
    console.error(err)
    return message.client.sendMessage(message.jid, err.toString())
  })

  if (spotifydl.error) return message.client.sendMessage(message.jid,{text:  "Error Fetching: ${match.trim()}. try Aak "})

  await new Promise(t => setTimeout(t,0))
         await message.client.sendMessage(message.jid,{text: `
_ᴛɪᴛʟᴇ_ : ${audioSpotify.data.name}
_ᴀʀᴛɪꜱᴛ_ : ${audioSpotify.data.artists}
_ᴀʟʙᴀᴍ_ : ${audioSpotify.data.album_name}
_ʀᴇʟᴇᴀꜱᴇ ᴅᴀᴛᴇ_ : ${audioSpotify.data.release_date}
`, edit: key }, {quoted: message});
  

  return await message.client.sendMessage(
      message.jid,
      {
          audio: audioSpotify.audio,
          mimetype: 'audio/mpeg',
          fileName: audioSpotify.data.name + '.mp3',
          ptt: false,
          contextInfo: { externalAdReply: {
 title: `${audioSpotify.data.name}`,
 body: `Eyy ${message.pushName} ithallee..??👍😌`,
mediaType: 1,
showAdAttribution: true,
renderLargerThumbnail: false,
thumbnailUrl: "https://i.imgur.com/cKRmb2X.png" }},
      },{quoted: message}
  )

}
 }catch(err){
message.reply(err)
}
})
