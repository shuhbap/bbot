const { extractMediaUrl, extractVideoUrl } = require("./utils");
const { getBuffer } = require("./functions");
const {toPTT, toAudio} = require("./media");
const config = require("../config");
const { SUDO } = require("../config");
const { setMention, getMention } = require("./database/mention");
const getRandomAudio = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
};

async function sendMenButton(message, match) {
    
const msg = await getMention();
        
if (!match) {
	let { PREFIX } = require("./index");
const buttons = [
  { buttonId: `${PREFIX}mention on`, buttonText: { displayText: 'ON' }, type: 1 },
  { buttonId:`${PREFIX}mention off`, buttonText: { displayText: 'OFF' }, type: 1 },
  { buttonId:`${PREFIX}mention get`, buttonText: { displayText: 'GET' }, type: 1 }
];
const fttxt = `ᴍᴇɴᴛɪᴏɴ:- ${msg.isEnable? "ON" : "OFF"}`
const buttonMessage = {
  text: "MENTION MANAGER!",
  footer: fttxt,
  buttons,
  headerType: 1,
  viewOnce: true
};

await message.client.sendMessage(message.jid, buttonMessage, { quoted: message });
};
    

    if (match === "get") {
        return await message.reply(msg.value || 'No Mention message found');
    } else if (match === 'on') {
        await setMention({ isEnable: true });
        return await message.reply('_Mention Activated_');
    } else if (match === 'off') {
        await setMention({ isEnable: false });
        return await message.reply('_Mention Deactivated_');
    } else if(match) {
        await setMention({ value: match });
        return await message.reply("Updated mention: " + match);
    }
}
async function sendMention(message, match) {
    let men;
    try {
        men = message.mention && message.mention[0] ? message.mention[0].split('@')[0] : null;
    } catch (error) {
        return;
    }

    if (!men) {
        return;
    }

    const menMsg = await getMention();
    const text = menMsg.value;
    const enabled = menMsg.isEnable;
    if (!enabled) {
        return;
    }

    const types = ["type/image", "type/video", "type/audio", "type/sticker", "type/gif"];
    const jsonObjects = text.match(/{.*}/g);
    let textContent = text.replace(jsonObjects, '').trim();
    let options = { contextInfo: {} };

    let mediaType = "text";

    for (const type of types) {
        if (text.includes(type)) {
            mediaType = type.replace("type/", '');
            textContent = textContent.replace(type, '').trim();
            break;
        }
    }

    if (jsonObjects) {
        try {
            const sanitizedJson = jsonObjects[0]
                .replace(/[\n\r]/g, '')
                .replace(/'/g, '"')
                .replace(/`/g, '"')
                .replace(/,\s*}/g, '}')
                .replace(/,\s*]/g, ']')
                .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');

            options = { ...options, ...JSON.parse(sanitizedJson) };
        } catch (e) {}
    }

    if (options.linkPreview) {
        options.contextInfo = options.contextInfo ? options.contextInfo : {};
        options.contextInfo.externalAdReply = options.linkPreview;
    }
    if (options.contextInfo?.externalAdReply?.thumbnail) {
        options.contextInfo.externalAdReply.thumbnailUrl = options.contextInfo.externalAdReply.thumbnail;
        delete options.contextInfo.externalAdReply.thumbnail;
    }
    delete options.linkPreview;

    const mediaUrls = await extractMediaUrl(textContent);
    const videoUrls = await extractVideoUrl(textContent);

    if (message.mention.includes(message.user) || SUDO.includes(men)) {
        if ((mediaType === 'image' || mediaType === 'video' || mediaType === 'audio') && mediaUrls.length > 0) {
            try {
                const mediaUrl = (mediaUrls);
                const videoUrl = (videoUrls);
                console.log(`Attempting to send ${mediaType}:`, mediaUrl);

                if (mediaType === 'image') {
                    await message.sendFromUrl(mediaUrl, options);
                } else if (mediaType === 'video') {
                    await message.sendFromUrl(mediaUrl, options);
                } else if (mediaType === 'audio') {
                    const buff = await getBuffer(videoUrl);
                   const audio = await toAudio(buff, 'mp4');
		   let wem = Array.from({length: 15}, () => Math.floor(Math.random() * 100)); 
                    await message.client.sendMessage(message.jid, { audio: audio,mimetype: 'audio/mpeg',
ptt: true, wem, ...options }, { quoted: message });
                }
            } catch (error) {
                await message.reply(options.caption || textContent);
                console.log(error);
            }
        } else {
            await message.reply(options.caption || textContent);
        }
    }
}

module.exports = { sendMenButton, sendMention };
