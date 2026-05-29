const { sendMenButton, sendMention } = require('../lib/mention');
const { command, isPrivate } = require("../lib");
command({
    pattern: "mention",
    fromMe: true,
    desc: "custom mention",
    type: "user",
}, async (message, match) => {
    await sendMenButton(message, match);
});

command({
    on: "text",
    fromMe: false,
    dontAddCommandList: true
}, async (message, match) => {
 await sendMention(message, match);
});
