const { command } = require("../lib");


command(
  {
    pattern: "pp",
    fromMe: true,
    desc: "Set Profile Photo",
    type: "user",
  },
  async (message, match, m) => {
    if (!message.reply_message.image)
     return await message.reply("_Oru Photokk Reply aak_");
    let buff = await m.quoted.download();
    await message.setPP(message.user, buff);
    return await message.reply("_Photo Update akit indeee.._");
  }
);

command(
  {
    pattern: "setname",
    fromMe: true,
    desc: "Set WhatsApp Name",
    type: "user",
  },
  async (message, match) => {
    if (!match) return await message.reply("_Name Adikkadaa.._");
    await message.updateName(match);
    return await message.reply(`_Name aayit indeee...😶 : ${match}_`);
  }
);

command(
  {
    pattern: "block",
    fromMe: true,
    desc: "Block User",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Block akande aale mention aak.._");
      await message.block(jid);
      return await message.client.sendMessageMessage(message.jid, {text: `_@${jid.split("@")[0]} Block aaki 😂_`}, {
        mentions: [jid],
      });
    } else {
      await message.block(message.jid);
      return await message.reply("_block aaki😂_");
    }
  }
);

command(
  {
    pattern: "unblock",
    fromMe: true,
    desc: "Unblock User",
    type: "user",
  },
  async (message, match) => {
    if (message.isGroup) {
      let jid = message.mention[0] || message.reply_message.jid;
      if (!jid) return await message.reply("_Unblock akande aale mention aak.._");
      await message.block(jid);
      return await message.client.sendMessage(message.jid, {text:`_@${jid.split("@")[0]} unblock aaki🤥_`}, {
        mentions: [jid],
      });
    } else {
      await message.unblock(message.jid);
      return await message.reply("_unblock aaki🤥_");
    }
  }
);

command(
  {
    pattern: "jid",
    fromMe: true,
    desc: "Jid Group or person",
    type: "user",
  },
  async (message, match) => {
    return await message.reply(
      message.mention[0] || message.reply_message.jid || message.jid
    );
  }
);

command(
  {
    pattern: "wave",
    fromMe: true,
    desc: "wave maker",
    type: "user",
  },
  async (message, match, client) => {
      let jid = match?.trim()||message.jid;

      let media = await client.quoted.download()
      let buffer = media
      
message.client.sendMessage(jid, { audio: buffer,
			waveform: Array.from({length: 30}, () => Math.floor(Math.random() * 100)),ptt:true,mimetype:"audio/mpeg"
    })
  }
);

command({pattern: 'getjids', desc: 'Get all groups\' jids',type: 'info',fromMe: true}, async (msg, query) => {
    var groups = Object.keys(await msg.client.groupFetchAllParticipating())
    if (!groups.length) return await msg.reply("_Group onulladeeeyyy..😂!_");
    var _msg = "";
    for (let e of groups){
        try {
    var g_name = (await msg.client.groupMetadata(e)).subject
    } catch {var g_name = 'Can\'t load name (404)'}
    _msg+= `_Group:_ ${g_name} \n_JID:_ ${e}\n\n`
    }
    await msg.reply(_msg)
});
