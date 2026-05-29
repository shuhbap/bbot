const { command ,isPrivate} = require("../lib/");

/* Created by SUHAID-BRO ©2023
Created for AFIYA-MD */

command(
    {
        pattern: "ping",
        fromMe: isPrivate,
        desc: "To check ping",
        type: "misc",
    },
    async (message, match) => {
        const start = new Date().getTime();
      let { key } = await message.reply(`*Pinging...*`);
        const end = new Date().getTime();
var speed = end - start;
 
await new Promise(t => setTimeout(t,0))
         await message.client.sendMessage(message.jid,{text:`*Afiya!*  
*Latency!* ${speed}.000 ` , edit: key});
})
