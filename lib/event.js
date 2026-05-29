var config = require("../config");
const { HANDLERS } = require("../config")
var commands = [];
//const prefix = (!config.HANDLERS || config.HANDLERS.trim() === 'null' || config.HANDLERS.trim() === 'false') ? '' : config.HANDLERS.trim();
function command(info, func) {
  let types = ['converter','downloader','game','group','heroku','tool','user','x-media','search','Textpro','Maker menu']
  var infos = info;
  infos.function = func;
  infos.pattern = new RegExp(`${config.HANDLERS}( ?${info.pattern})`, `is`);
  if (!infos.dontAddCommandList) infos.dontAddCommandList = false;
  if (!infos.fromMe) infos.dontAddCommandList = false;
  if (!info.type||!types.includes(info.type)) infos.type = 'misc';
  commands.push(infos);
  return infos;
}
module.exports = {
  command,
  commands,
};
