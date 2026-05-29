const { command, isPrivate , getBuffer , parseJid , reSize } = require("../lib");
const { toAudio } = require("../lib/media");
var audios = ["https://i.imgur.com/uoeQFqN.mp4"];

command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    dontAddCommandList: true,
  },
  async (message, match) => {

const audio = audios[Math.floor(Math.random() * audios.length)]
const Audio = await getBuffer(audio)
var res = await toAudio(Audio, 'mp4')
message.client.sendMessage(message.jid, {
			audio: res,
			mimetype: 'audio/mpeg',
			ptt: true,
			waveform: [77] } , { quoted : message })
			});
