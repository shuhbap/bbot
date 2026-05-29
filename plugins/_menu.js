
const plugins = require("../lib/event");
const { command, isPrivate, clockString, runtime } = require("../lib");
const { BOT_INFO } = require("../config");
const config = require("../config");
const { hostname, uptime } = require("os");
const { tiny } = require("../lib/fancy_font/fancy")
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
/*AFIYA-MD
MADE BY  SUHAID*/





command(
  {
    pattern: "menu",
    fromMe: isPrivate,
    desc: "Show All commands",
    type:"user",
  },
  async (message, match) => {
    if (match) {
      for (let i of plugins.commands) {
        if (i.pattern.test(message.prefix + match))
          message.reply(
            `\`\`\`Command : ${message.prefix}${match.trim()}
Description : ${i.desc}\`\`\``
          );
      }
    } else {
      let { prefix } = message;
      let [date, time] = new Date()
        .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
        .split(",");
      let menu = `╭━━━━━❮${config.BOT_INFO.split(';')[0]}❯━━━
┃ ✪  𝗢𝗪𝗡𝗘𝗥 :  ${config.BOT_INFO.split(';')[1]}
┃ ✪  𝗨𝗦𝗘𝗥 : ${message.pushName}
┃ ✪  𝗗𝗔𝗧𝗘 : ${date}
┃ ✪  𝗧𝗜𝗠𝗘 : ${time}
┃ ✪  𝗣𝗟𝗨𝗚𝗜𝗡𝗦 : ${plugins.commands.length} 
┃ ✪  𝗥𝗨𝗡𝗧𝗜𝗠𝗘 : ${runtime(process.uptime())} 
╰━━━━━━━━━━━━━━━
${readMore}  
╭╼╾╼╾╼╾╼╾╼╾╼╾╼╾╼\n╽`;
      
      let cmnd = [];
      let cmd;
      let category = [];
      plugins.commands.map((command, num) => {
        if (command.pattern) {
          cmd = command.pattern
            .toString()
            .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
        }

        if (!command.dontAddCommandList && cmd !== undefined) {
          let type;
          if (!command.type) {
            type = "misc";
          } else {
            type = command.type.toLowerCase();
          }

          cmnd.push({ cmd, type: type });

          if (!category.includes(type)) category.push(type);
        }
      });
      cmnd.sort();
      category.sort().forEach((cmmd) => {
        menu += `
┃  ╭─────────────❏
┃  │ ❮---- ${cmmd} ----❯
┃  ╰┬────────────❏
┃  ┌┤`;
        let comad = cmnd.filter(({ type }) => type == cmmd);
        comad.forEach(({ cmd }, num) => {
          menu += `\n┃  │ ⛥ ${cmd.trim()}`;
        });
        menu += `\n┃  ╰─────────────❏`;
      });

      menu += `\n╰━━━━━━━━━━━──❏\n`;
  const link = `${BOT_INFO.split(';')[2]}`;
        

        if (link.endsWith(".mp4") || link.endsWith(".gif")) {
            return await message.client.sendMessage(message.from, { video: {url:link},caption: tiny(menu), gifPlayback: true });
        } else if (link.endsWith(".jpg") || link.endsWith(".png")) {
            return await message.client.sendMessage(message.jid, { image: {url:link},caption: tiny(menu) });
       } else {
            
        /* let { PREFIX } = require("../lib");

          const buttons = [
  { buttonId: `${PREFIX}ping`, buttonText: { displayText: 'PING' }, type: 1 },
  { buttonId:`${PREFIX}runtime`, buttonText: { displayText: 'RUNTIME' }, type: 1 }
];
const buttonMessage = {
  text: tiny(menu),
  footer: "made by 🦇 with 👽",
  buttons,
  headerType: 1,
  viewOnce: true
};*/

return await message.client.sendMessage(message.jid,menu, {quoted: message});
        }
  }
}
);


  
command(
  {
    pattern: "list",
    fromMe: isPrivate,
    desc: "Show All Commands",
    type: "user",
  },
  async (message, match, { prefix }) => {
    let menu = "\t\t*𝙻𝙸𝚂𝚃 𝙲𝙾𝙼𝙼𝙰𝙽𝙳𝚂*\n\n";

    let cmnd = [];
    let cmd, desc;
    plugins.commands.map((command) => {
      if (command.pattern) {
        cmd = command.pattern.toString().split(/\W+/)[1];
      }
      desc = command.desc || false;

      if (!command.dontAddCommandList && cmd !== undefined) {
        cmnd.push({ cmd, desc });
      }
    });
    cmnd.sort();
    cmnd.forEach(({ cmd, desc }, num) => {
      menu += `${(num += 1)} *${cmd.trim()}*\n`;
      if (desc) menu += `Use: \`\`\`${desc}\`\`\`\n\n`;
    });
    menu += `⌊╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺╺⌋`;
    return await message.reply(tiny(menu));
  }
);
