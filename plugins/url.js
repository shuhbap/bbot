const { IMGBB_KEY } = require('../config');
const ffmpeg = require('fluent-ffmpeg');
const { upload } = require('./misc/imgur');
const { command, isPrivate } = require("../lib");
const fs = require('fs');
const pathh = './fileUrl.mp3';

async function webpUpload(file){
    return new Promise(async (resolve)=>{
    const webpupload = require("imgbb-uploader");
    for (let key of IMGBB_KEY){
    const options = {apiKey: key,imagePath: file};
    var res = await webpupload(options)
    if (res.url) return resolve(res.url);
    }
});
}

command({
    pattern: "url",
    fromMe: isPrivate,
    desc: "url maker",
    type: "misc",
  },
  async (message, match, m) => {

if (message.reply_message.sticker){
    return await message.client.sendMessage(message.jid,{text:"_"+(await webpUpload(await m.quoted.download()))+"_"},{ quoted:message })
}
else if (message.reply_message.audio){
    if (message.reply_message.duration > 90) return await message.client.sendMessage(message.jid,{text:'_Audio too large. Try below 90 seconds!_'},{ quoted:message });
    fs.writeFileSync(pathh, await m.quoted.download());
    await message.reply("_Converting to video & uploading..._")
    ffmpeg(pathh).outputOptions(["-y", "-filter_complex", "[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]", "-map", "[vid]", "-map 0:a"]).save('output.mp4').on('end', async () => {
    try { var res = await upload('output.mp4'); } catch {return await message.client.sendMessage(message.jid,{text:"_Failed to upload file!_"},{ quoted:message });}
    return await message.client.sendMessage(message.jid,{text:"_"+res.link+"_"},{ quoted:message });
});
}
else if (message.reply_message.image){
    const imgp = './dldImg.jpg';
    fs.writeFileSync(imgp,await m.quoted.download());
    let {link} = await upload(imgp)
if (typeof link == 'function'){
    return await message.reply("_There are issues with Bot's IP & imgur, so uploading can't be done_")
}
try { await message.client.sendMessage(message.jid,{text:"_"+link+"_"},{ quoted:message }) } catch {return await message.client.sendMessage(message.jid,{text:"_Failed to upload file!_"},{ quoted:message });}
} else if(message.reply_message.video){
const imgp = './dldVideo.mp4';
    fs.writeFileSync(imgp,await m.quoted.download());
    let {link} = await upload(imgp)
if (typeof link == 'function'){
    return await message.reply("_There are issues with Bot's IP & imgur, so uploading can't be done_")
}
try { await message.client.sendMessage(message.jid,{text:"_"+link+"_"},{ quoted:message }) } catch {return await message.client.sendMessage(message.jid,{text:"_Failed to upload file!_"},{ quoted:message });}
}
else return await message.reply("_Reply to image|video|audio|sticker_");
});



/*const { command, isPrivate }  = require("../lib");
const axios = require("axios");
const FormData = require("form-data");
const { fromBuffer } = require("file-type");


const userAgentList = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
        'Mozilla/4.0 (compatible; MSIE 9.0; Windows NT 6.1)',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36 Edg/87.0.664.75',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 Edge/18.18363',
    ]

    const randomUserAgent = userAgentList[Math.floor(Math.random()*userAgentList.length)];
  


command({
pattern: "url",
fromMe: isPrivate,
desc: "url maker",
}, async(message,match,m)=>{
	try{
	if (!message.reply_message.video && !message.reply_message.audio && !message.reply_message.image) return message.reply("_*Reply to a video/audio/image_")
	
	let bb = await m.quoted.download();
	const { ext } = await fromBuffer(bb);
    const formData = new FormData();
    formData.append("fileToUpload", bb, `file.${ext}`);
    formData.append("reqtype", "fileupload");
    const response = await axios.post("https://catbox.moe/user/api.php", formData, {
        headers: {
            ...formData.getHeaders(),
            "User-Agent":  randomUserAgent,
        },
    });
    
    await message.reply(response.data.trim())
}catch(e){
await message.reply("Error{}");
}
    
})*/
