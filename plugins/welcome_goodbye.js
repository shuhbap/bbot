const {
    command
} = require("../lib/");
const {
    setMessage,
    getMessage,
    delMessage,
    getStatus,
    toggleStatus
} =
require("../lib/database/greetings")

command(
    {
        pattern: "welcome",
        fromMe: true,
        desc: "Welcome Message",
        type: "group",
    },
    async (message, match) => {
        if (!message.isGroup) return;
        let {
            prefix
        } = message;
        let status = await getStatus(message.jid, "welcome");
        let stat = status ? "on": "off";

        if (!match) {
            let replyMsg = `Welcome manager\n\nGroup: ${
            (await message.client.groupMetadata(message.jid)).subject
            }\nStatus: ${stat}\n\n`;
let {PREFIX} = require("../lib");
            const buttons = [
  { buttonId: `${PREFIX}welcome on`, buttonText: { displayText: 'WELCOME ON' }, type: 1 },
  { buttonId:`${PREFIX}welcome off`, buttonText: { displayText: 'WELCOME OFF' }, type: 1 },
   { buttonId: `${PREFIX}welcome get`, buttonText: { displayText: 'GET' }, type: 1 }

];
const buttonMessage = {
  text: replyMsg,
  footer: "made by 🦇 with 👽",
  buttons,
  headerType: 1,
  viewOnce: true
};
            
            return await message.client.sendMessage(message.jid,buttonMessage,{quoted: message});
        }

        if (match === "get") {
            let msg = await getMessage(message.jid, "welcome");
            if (!msg) return await message.reply("_There is no welcome set!!_");
            return message.reply(msg.message);
        }

        if (match === "on") {
            let msg = await getMessage(message.jid, "welcome");
            if (!msg)
                return await message.reply("_There is no welcome message to enable!!_");
            if (status) return await message.reply("_Welcome already enabled!!_");
            await toggleStatus(message.jid);
            return await message.reply("_Welcome enabled!!_");
        }

        if (match === "off") {
            if (!status) return await message.reply("_Welcome already disabled!!_");
            await toggleStatus(message.jid, "welcome");
            return await message.reply("_Welcome disabled!!_");
        }

        if (match == "delete") {
            await delMessage(message.jid, "welcome");
            return await message.reply("_Welcome deleted successfully!!_");
        }
        await setMessage(message.jid, "welcome", match);
        return await message.reply("_Welcome set successfully!!_");
    }
);

command(
    {
        pattern: "goodbye",
        fromMe: true,
        desc: "Goodbye Message",
        type: "group",
    },
    async (message, match) => {
        if (!message.isGroup) return;
        let status = await getStatus(message.jid, "goodbye");
        let stat = status ? "on": "off";
        let replyMsg = `Goodbye manager\n\nGroup: ${
        (await message.client.groupMetadata(message.jid)).subject
        }\nStatus: ${stat}\n\n`;

        if (!match) {
            
let {PREFIX} = require("../lib");
            const buttons = [
  { buttonId: `${PREFIX}goodbye on`, buttonText: { displayText: 'GOODBYE ON' }, type: 1 },
  { buttonId:`${PREFIX}goodbye off`, buttonText: { displayText: 'GOODBYE OFF' }, type: 1 },
   { buttonId: `${PREFIX}goodbye get`, buttonText: { displayText: 'GET' }, type: 1 }

];
const buttonMessage = {
  text: replyMsg,
  footer: "made by 🦇 with 👽",
  buttons,
  headerType: 1,
  viewOnce: true
};
            
            return await message.client.sendMessage(message.jid,buttonMessage,{quoted: message});
      
            
        }

        if (match === "get") {
            let msg = await getMessage(message.jid, "goodbye");
            if (!msg) return await message.reply("_There is no goodbye set!!_");
            return message.reply(msg.message);
        }

        if (match === "on") {
            await toggleStatus(message.jid, "goodbye");
            return await message.reply("_Goodbye enabled!!_");
        }

        if (match === "off") {
            await toggleStatus(message.jid);
            return await message.reply("_Goodbye disabled!!_");
        }

        if (match === "delete") {
            await delMessage(message.jid, "goodbye");
            return await message.reply("_Goodbye deleted successfully!!_");
        }

        await setMessage(message.jid, "goodbye", match);
        return await message.reply("_Goodbye set successfully!!_");
    }
);
