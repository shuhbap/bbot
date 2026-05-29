/*const {command, isPrivate, getBuffer} = require("../lib");
const fetch = require('node-fetch')
const ID3Writer = require('browser-id3-writer')
const {AUDIO_DATA} = require("../config")
let data =  AUDIO_DATA.split(";")


command({
  pattern: "take",
  fromMe: isPrivate,
  desc: "Mp3 Name changer",
  type: "misc",
},
async(message, match , m)=> {
  
try {
  if(!message.reply_message.audio);
let bx = await m.quoted.download()
const img = await(await fetch(data[2])).buffer()
const writer = new ID3Writer(bx)
writer.setFrame('TIT2', `${AUDIO_DATA.split(";")[0]}`)
      .setFrame('TPE1', [`${AUDIO_DATA.split(";")[1]}`])
      .setFrame('TALB', 'x')
      .setFrame('TYER', 2004)
      .setFrame('APIC', {
          type: 3,
          data: img,
          description: 'Super picture'
      })
writer.addTag()
       
const media = Buffer.from(writer.arrayBuffer)

  
message.client.sendMessage(message.jid , {audio: media, mimetype: "audio/mpeg"}, {quoted: message})
} catch (error) {
  console.log(error)
}
  
})*/
