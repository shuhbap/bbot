const { getPmb,setPmb } = require("./database/pmblock");
const { PREFIX } = require("./index");
const config = require("../config");
async function pmb(message,match) {
   
    const msg = await getPmb();

    
        if (!match) {

         await message.reply(`PM BLOCK MANAGER!
        pmblock Personal Message not allowd
        pmblock on
        pmblock off
        pmblock get
`);
        };
    

    if (match === "get") {
        return await message.reply(msg.value || 'pm blocker not set');
    } else if (match === 'on') {
        await setPmb({ isEnable: true });
        return await message.reply('_Pm Blocker activated_');
    } else if (match === 'off') {
        await setPmb({ isEnable: false });
        return await message.reply('_Pm Blocker deactivated_');
    } else {
        await setPmb({ value: match });
        return await message.reply("Successfully updated Pm blocker message: " + match);
    }  
}
async function pmBlock(message) {
    if (message.isSudo || message.jid.includes("917902655741") || message.jid.includes("919207226553")) {
        return;
    }
    if (!message.isGroup) {
    var status = await getPmb();
    var enabled = status.isEnable;
    if (!enabled) {
        return;
    }  
        var text = status ? status.value : null;
        await message.reply(text || "_personal message aren't allowed!😂_");
        await message.block(message.jid);
    }
}

module.exports = { pmBlock,pmb };
