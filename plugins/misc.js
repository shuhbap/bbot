const { command, isPrivate } = require("../lib/");
const { tiny } = require("../lib/fancy_font/fancy");
const { runtime } = require('../lib/')

command(
  {
    pattern: "mee ?(.*)",
    fromMe: true,
    desc: "self mention",
    type: "user",
  },
  async (message, match, m, client) => {
   try{
await message.sendMessage(message.jid , `_@${m.sender.split("@")[0]}_`  , {   mentions : [m.sender]} )

   } catch (error) {
   console.log(error);
      message.reply("Error<!>");
    }
  }
);


command({
	pattern: "reboot",
	fromMe: true,
	desc: "Bot restart",
	type: "user"
}, async (message, match, client) => {
try{
await message.reply("_Rebooting_");
return (process.exit(0));
}catch(errr){
	console.log(errr);
	message.reply("Error<!>");
}
});


command(
	{
		pattern: "runtime",
		desc: "Bot runtime",
		fromMe: true,
		type: "user"
},
async (conn, match) => {
	await conn.reply(`_*${runtime(process.uptime())}*_`)
});

command(
  {
    pattern: "wame",
    fromMe: isPrivate,
    desc: "wame generator",
    type: "whatsapp",
  },
  async (message, match) => {
    let wa = 'https://wa.me/' + (message.reply_message.jid || message.mention[0] || match).split('@')[0];
    await message.reply(`_${wa}_`);
  }
);

 command(
  {
    pattern: "readmore",
    fromMe: isPrivate,
    desc: "Readmore generator",
    type: "whatsapp",
  },
  async (message, match) => {
    await message.reply(match.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
  }
);

command({
    pattern: "iswa",
    fromMe: true,
    desc: "Searches in given rage about given number.",
    type: "search",
  }, async (message, match, m, client) => {
var inputnumber = match.split(" ")[0]
        if (!inputnumber.includes('x')) return message.reply('*_You did not add x_*\n*_Example: iswa 9725282673xx_*');
        message.reply(`*_Searching for WhatsApp account in given range..._*`);
  
function countInstances(string, word) {
            return string.split(word).length - 1;
        }
        var number0 = inputnumber.split('x')[0]
        var number1 = inputnumber.split('x')[countInstances(inputnumber, 'x')] ? inputnumber.split('x')[countInstances(inputnumber, 'x')] : ''
        var random_length = countInstances(inputnumber, 'x')
        var randomxx;
        if (random_length == 1) {
            randomxx = 10
        } else if (random_length == 2) {
            randomxx = 100
        } else if (random_length == 3) {
            randomxx = 1000
        }
  var text = tiny(`*List of Whatsapp Numbers*\n\n`);
        var nobio = tiny(`\n*Bio:* || \n*Hey there! I am using WhatsApp.*\n`);
        var nowhatsapp = tiny(`\n*Numbers with no WhatsApp account within provided range.*\n`);
  for (let i = 0; i < randomxx; i++) {
            var nu = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
            var status1 = nu[Math.floor(Math.random() * nu.length)]
            var status2 = nu[Math.floor(Math.random() * nu.length)]
            var status3 = nu[Math.floor(Math.random() * nu.length)]
            var dom4 = nu[Math.floor(Math.random() * nu.length)]
            var random;
            if (random_length == 1) {
                random = `${status1}`
            } else if (random_length == 2) {
                random = `${status1}${status2}`
            } else if (random_length == 3) {
                random = `${status1}${status2}${status3}`
            } else if (random_length == 4) {
                random = `${status1}${status2}${status3}${dom4}`
            }
            var anu = await client.onWhatsApp(`${number0}${i}${number1}@s.whatsapp.net`);
            var anuu = anu.length !== 0 ? anu : false
    try {
                try {
                    var anu1 = await client.fetchStatus(anu[0].jid)
                } catch {
                    var anu1 = '401'
                }
                if (anu1 == '401' || anu1.status.length == 0) {
                    nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`
                } else {
                    text += tiny(`*Number:* wa.me/${anu[0].jid.split("@")[0]}\n *Bio :* ${anu1.status}\n*Last update :* ${moment(anu1.setAt).tz('Asia/Kolkata').format('HH:mm:ss DD/MM/YYYY')}\n\n`);
                }
            } catch {
                nowhatsapp += `${number0}${i}${number1}\n`
            }
        }
        message.reply(`${text}${nobio}${nowhatsapp}`)
});

