const {
    command,
    getAlive,
    setAlive,
    alive,
    isPrivate
} = require('../lib')

command({
    pattern: 'alive',
    fromMe: isPrivate,
    desc: 'Does bot work?',
    type: 'user'
},
async (message, match) => {

try{
    const msg = await getAlive();
    if(match == "get" && message.sudo == true){
    return await message.reply(msg);
    } else if(match && message.sudo == true) {
    await setAlive(match);
    return await message.reply('_Alive Updated_');
    }
 return await alive(message,msg);

} catch(e){
message.reply(e)
}
});
