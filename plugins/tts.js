const {
    command,
    isPrivate,
    webp2mp4
} = require("../lib/")
const googleTTS = require("google-tts-api");
const { toAudio } = require("../lib/media");
command(
    {
        pattern: "tts",
        fromMe: isPrivate,
        desc: "text to speech.",
        category: "converter",
    },
    async (message, match,m) => {
    var duration = [200001355,3999600,359996400] // Fake duration. Make it false for actual duration
let fake = duration[Math.floor(Math.random()*duration.length)] || false
        if (!match) {
            message.reply('Example:\ntts hello afiya')
        } else {
            const audio = googleTTS.getAudioUrl(`${match}`, {
                lang: "ml",
                slow: false,
                host: "https://translate.google.com",
            })
            message.client.sendMessage(message.jid, {
                audio: {
                    url: audio,
                },
                mimetype: 'audio/mp4',
                waveform: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),
                ptt: true,
                seconds: fake,
                fileName: `${match}.mp3`,
            }, {
                quoted: message,
            })
        }
    });
