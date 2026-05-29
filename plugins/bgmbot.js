/*const { command, isPublic , getBuffer , parseJid , reSize } = require("../lib");
const { toAudio } = require("../lib/media");
const bgm = require("../media/bgm.json");
const config = require("../config");

command(
  {
    on: "text",
    fromMe: isPublic,
    dontAddCommandList: true,
  },
  async (message, match) => {

let audios = [];
const add = match?.toLowerCase().trim().split(' ') || [match?.toLowerCase().trim()];
for (let key in bgm) {
add.forEach(s => {
if (s.toLowerCase() == key.toLowerCase()) {
audios.push(bgm[key]);
}
})
}
const audio = audios[Math.floor(Math.random() * audios.length)]
const Audio = await getBuffer(audio)
var res = await toAudio(Audio, 'mp4')
	  if (config.BGMBOT === 'true') {
                //if (isOwner) return;        
                await client.sendPresenceUpdate('recording', m.jid);
message.client.sendMessage(message.jid, {
			audio: res,
			mimetype: 'audio/mpeg',
			ptt: true,
			waveform: [77] } , { quoted : message })
	  }  
			});
*/
