
//INSTA DONWLOADER 
//BY SUHAID-BRO
//© AFIYA-MD



const { command, getJson, isPrivate } = require("../lib/");
const config = require("../config");
const { CAPTION } =  require("../config");


     command(
      {
      pattern: "insta",
      on: "text",
      fromMe: isPrivate,
      desc: "Instagram Video/Post/Reels Downloader!",
      type: "downloader",
      },
   async (message, match, m) => {
try{
if(!match) return await message.reply("Need insta LINK");
     if(!match.includes("instagram.com")) return;
      let {result} = await getJson(`https://api-afiya-bot.onrender.com/insta/v1/igdl?url=${match}`)
if (result && result.length > 0 && result[0].url) {
        await message.sendFromUrl(result[0].url,{caption:(config.CAPTION),quoted: message});
    } 
}catch(e){
  console.log(e);
message.reply("ERROR: [553]");
}

   });
