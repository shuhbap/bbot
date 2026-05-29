const {command , isPrivate, getBuffer} = require("../lib");
const  getFBInfo = require("../lib/fb-downloader");
const fetch = require("node-fetch");
const config = require("../config");
const { CAPTION } = require("../config");
 command({
 pattern: "fb",
 fromMe: isPrivate,
 desc: "fb downloader"
},

async(message , match)=>{
try{
if(!match.includes("facebook.com")) return;
await message.reply("_Downloading..._");
let {sd , hd ,thumbnail}= await getFBInfo(match);
if(match.split(";")[1] == "hd"){
return await message.client.sendMessage(message.jid , {video: {url: sd} , caption: (config.CAPTION), thumbnail: img }, {quoted: message});
}
 
let img = await getBuffer(thumbnail);
let rs = await (await fetch(sd)).buffer()

await message.client.sendMessage(message.jid , {video:  rs, caption: (config.CAPTION),  thumbnail: img, contextInfo: { forwardingScore: 8888,
isForwarded: true,}}, {quoted: message});
}catch(e){
await message.reply(`
*Download failed 
Error: ${e}*
`)
}
});
