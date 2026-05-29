const config = require("../config");
const { command, isPrivate, errorMessage, PREFIX} = require("../lib/");
const { isAdmin, parsedJid, isUrl, isPublic } = require("../lib");
const { cron, saveSchedule } = require("../lib/scheduler");
const { groupDB } = require("../lib/database/group");
const actions = ["kick", "warn", "null"];

command({
    pattern: "antifake",
    fromMe: true,
    desc: "remove fake numbers",
    type: "group",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) return;
      if (!match)
        return await message.reply("_*antifake* 256,94,92_\n_*antifake* on/off_\n_*antifake* get_");
      const { antifake } = await groupDB(["antifake"],{ jid: message.jid, content: {} },"get",);
      if (match.toLowerCase() == "get") {
        if (!antifake || antifake.status == "false" || !antifake.data)
          return await message.reply("_Not Found_");
        return await message.reply(`_*activated restricted numbers*: ${antifake.data}_`);
      } else if (match.toLowerCase() == "on") {
        const data = antifake && antifake.data ? antifake.data : "";
        await groupDB(["antifake"],{ jid: message.jid, content: { status: "true", data } },"set",);
        return await message.reply(`_Antifake Activated_`);
      } else if (match.toLowerCase() == "off") {
        const data = antifake && antifake.data ? antifake.data : "";
        await groupDB(["antifake"],{ jid: message.jid, content: { status: "false", data } },"set",);
        return await message.reply(`_Antifake Deactivated_`);
      }
      match = match.replace(/[^0-9,!]/g, "");
      if (!match) return await message.reply("value must be number");
      const status = antifake && antifake.status ? antifake.status : "false";
      await groupDB(["antifake"],{ jid: message.jid, content: { status, data: match } },"set",);
      return await message.reply(`_Antifake Updated_`);
    } catch (error) {
      message.reply(error);
    }
  },
);


command({
    pattern: "pdm",
    fromMe: true,
    desc: "promote, demote messages",
    type: "group",
  },
  async (message, match) => {
    try {
      if (!message.isGroup) return;
      if (!match) return message.reply("pdm on/off");
      if (match != "on" && match != "off") return message.reply("pdm on");
      const { pdm } = await groupDB(["pdm"],{ jid: message.jid, content: {} }, "get",);
      if (match == "on") {
        if (pdm == "true") return message.reply("_Already activated_");
        await groupDB(["pdm"], { jid: message.jid, content: "true" }, "set");
        return await message.reply("_activated_");
      } else if (match == "off") {
        if (pdm == "false") return message.reply("_Already Deactivated_");
        await groupDB(["pdm"], { jid: message.jid, content: "false" }, "set");
        return await message.reply("_deactivated_");
      }
    } catch (error) {
      message.reply(error);
    }
  },
);


command(
  {
    pattern: "add",
    fromMe: true,
    desc: "Adds a person to group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to add_");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin_");
    let jid = parsedJid(match);
    await message.add(jid);
    return await message.reply(`@${jid[0].split("@")[0]} *Added*`, {
      mentions: jid,
    });
  }
)

command(
  {
    pattern: "kick",
    fromMe: true,
    desc: "Remove Person from group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("```This command is for group only```");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user To Kick_");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_i'm not admin_");
    let jid = parsedJid(match);
    await message.kick(jid);
    return await message.reply(`@${jid[0].split("@")[0]} _Kicked_`, {
      mentions: jid,
    });
  }
);

command(
  {
    pattern: "invite",
    fromMe: isPrivate,
    desc: "get group invite link",
    type: "group",
  },
  async (message) => {
if (!message.isGroup)
      return await message.reply("*_This command is for groups!!_*");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("*_I'm not admin!_*");
var invite = await message.client.groupInviteCode(message.jid);  message.reply(`_https://chat.whatsapp.com/${invite}_`)
  });
  
  command(
  {
    pattern: "join",
    fromMe: true,
    desc: "Join in the group",
    type: "group",
  },
  async (message, match) => {
    var rgx = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/
    if (!match || !rgx.test(match)) return await message.reply("_Need group link_")
    var res = await message.client.groupAcceptInvite(match.split("/")[3])
    if (!res) return await message.reply("_Invalid Group Link!_")
    if (res) return await message.reply("_Joined!_")
  }
);

command(
  {
    pattern: "left",
    fromMe: true,
    desc: "Left from the group",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    await message.client.groupLeave(message.jid)
  }
);

command(
  {
    pattern: "promote",
    fromMe: true,
    desc: "promote get admin",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command only works in group chats_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to promote_");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin!_");
    let jid = parsedJid(match);
    await message.promote(jid);
    return await message.reply(`@${jid[0].split("@")[0]} 𝘗𝘙𝘖𝘔𝘖𝘛𝘌𝘋 𝘈𝘚 𝘈𝘕 𝘈𝘋𝘔𝘐𝘕`, {
      mentions: jid,
    });
  }
);

command(
  {
    pattern: "demote",
    fromMe: true,
    desc: "Delete person admin",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup)
      return await message.reply("_This command only works in group chats_");
    match = match || message.reply_message.jid;
    if (!match) return await message.reply("_Mention user to demote_");
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.reply("_I'm not admin!_");
    let jid = parsedJid(match);
    await message.demote(jid);
    return await message.reply(`@${jid[0].split("@")[0]} _Demoted_`, {
      mentions: jid,
    });
  }
);

command(
  {
    pattern: "mute",
    fromMe: true,
    desc: "Group close command",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command only works in group chats_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_I'm not admin!_*");
    await message.reply("_Group Muted_");
    return await client.groupSettingUpdate(message.jid, "announcement");
  }
);

command(
  {
    pattern: "unmute",
    fromMe: true,
    desc: "group open command",
    type: "group",
  },
  async (message, match, m, client) => {
    if (!message.isGroup)
      return await message.reply("_This command only works in group chats_");
    if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("_I'm not admin!_*");
    await message.reply("_Group Unmuted_");
    return await client.groupSettingUpdate(message.jid, "not_announcement");
  }
);

command(
  {
    pattern: "tagall",
    fromMe: true,
    desc: "Mentiom all members",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return;
    const { participants } = await message.client.groupMetadata(message.jid);
    let teks = 
``;
  
    for (let mem of participants) {
      teks += ` @${mem.id.split("@")[0]}\n`;
    }
       teks += ``;
    message.sendMsg(teks.trim(), {
      mentions: participants.map((a) => a.id),
    });
  }
);


command ({
 pattern: "tag",
 fromMe: true,
 desc: "Hide tag message",
 type: "group",
},
async(message, match , m)=>{
	
match = match || message.reply_message.text
if(!match) return;

let bb = await message.client.groupMetadata(message.jid)

let p = bb.participants.map(v=> v.id)



return message.client.sendMessage(message.jid , {text: match , mentions: p} , {quoted: m})

});    

command(
  {
    pattern: "gname",
    fromMe: true,
    desc: "change group name",
    type: "group",
  },
  async (message, match, client) => {
if (!message.isGroup)
      return await message.reply("*_This command is for only groups_*");
if (!match) await message.reply("Example:\ngname afiya")
if (!isAdmin(message.jid, message.user, message.client))
      return await message.reply("*_I'm not admin!_*");
await message.client.groupUpdateSubject(message.jid, match);
await message.reply(`*_Group name changed into : ${match}_*`);
  });
 
 
command(
  {
    pattern: "lock",
    fromMe: true,
    desc: "only allow admins to modify the group's settings.",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    return await message.client.groupSettingUpdate(message.jid, "locked")
  }
);


command(
  {
    pattern: "unlock",
    fromMe: true,
    desc: "allow everyone to modify the group's settings.",
    type: "group",
  },
  async (message, match) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    return await message.client.groupSettingUpdate(message.jid, "unlocked")
  }
);


command(
  {
    pattern: "gpp",
    fromMe: true,
    desc: "Change group icon",
    type: "group",
  },
  async (message, match , m, client) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    var admin = await isAdmin(message.jid, message.user, message.client);
    if (!admin) return await message.reply("_I'm not admin_");
    if (!(message.reply_message && message.reply_message.image)) return message.reply("_Reply to Image_")
   try{
 let  img = await m.quoted.download();
    await client.updateProfilePicture(message.jid, img);
    return await message.reply("_Successfully Updated_")
    } catch(e){
    	await message.reply(e)
}
  } 
);

command(
  {
    pattern: "gdesc",
    fromMe: true,
    desc: "Change group description",
    type: "group",
  },
  async (message, match, client) => {
    if (!message.isGroup) return await message.reply("_This command only works in group chats_")
    match = match || message.reply_message.text
    if (!match) return await message.reply("_Need Description!\nExample: gdesc New Description!_")
    const participants =  await message.client.groupMetadata(message.jid)
    if (participants && !(await isAdmin(message.jid, message.user, message.client))) return await message.reply("_I'm not admin_");
    await message.client.groupUpdateDescription(message.jid, match)
    return await message.reply("_Description updated_")
  }
);

//ANTI LINK

command(
  {
    on: "text",
    fromMe: false,
  },
  async (message, match) => {
    if (!message.isGroup) return;
    if (config.ANTILINK)
      if (isUrl(match)) {
        await message.reply("_Link detected_");
        let botadmin = await isAdmin(message.jid, message.user, message.client);
        let senderadmin = await isAdmin(
          message.jid,
          message.participant,
          message.client
        );
        if (botadmin) {
          if (!senderadmin) {
            await message.reply(
              `_Commencing Specified Action :${config.ANTILINK_ACTION}_`
            );
            return await message[config.ANTILINK_ACTION]([message.participant]);
          }
        } else {
          return await message.reply("_I'm not admin_");
        }
      }
  }
);
