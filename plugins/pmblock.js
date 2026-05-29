const { pmBlock,pmb} = require('../lib/pmblock');
const { command, isPrivate } = require("../lib");
command({
    pattern: "pmblocker",
    fromMe: true,
    desc: "pmblocker",
    type: "user",
}, async (message, match) => {
 await pmb(message, match)
});
command(
  {
    on: 'text',
    fromMe: false,
  },
  async (message) => {
    await pmBlock(message);
  }
);
