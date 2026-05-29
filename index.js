
const { default: makeWASocket,useMultiFileAuthState,Browsers,jidNormalizedUser,proto, delay} = require("@whiskeysockets/baileys");
const fs = require("fs");
const { serialize } = require("./lib/serialize");
const { Message, Image, Sticker } = require("./lib/Base");
const pino = require("pino");
const { groupDB } = require("./lib/database/group");
const path = require("path");
const events = require("./lib/event");
const got = require("got");
const config = require("./config");
const { ALWAYS_ONLINE } = require("./config")
const { PluginDB } = require("./lib/database/plugins");
const Greetings = require("./lib/Greetings");
const { MakeSession } = require("./lib/session");
const port = process.env.PORT || 8000;
//const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }),});
require("events").EventEmitter.defaultMaxListeners = 500;
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
if (!fs.existsSync("./lib/session/creds.json")) { MakeSession(config.SESSION_ID, "./lib/session/creds.json").then( console.log(" 😌 Afiya Starting Vesrion : " + require("./package.json").version)); }
fs.readdirSync("./lib/database/").forEach((plugin) => { if (path.extname(plugin).toLowerCase() == ".js") { require("./lib/database/" + plugin); }});
async function Afiya() { console.log("Syncing Database 💀"); await config.DATABASE.sync();
const { state, saveCreds } = await useMultiFileAuthState("./lib/session" ,pino({ level: "silent" }));
let conn = makeWASocket({ logger: pino({ level: "silent" }),auth: state,printQRInTerminal: false,browser: Browsers.macOS("Desktop"),downloadHistory: false,syncFullHistory: false,});
//setInterval(() => { store.writeToFile("./lib/store_db.json"); console.log("saved store"); }, 30 * 60 * 1000);
 conn.ev.on("call", async (c) => {
            try {
                if (config.CALL_REJECT === true) {
                    c = c.map((c) => c)[0];
                    let { status, from, id } = c;
                    if (status == "offer") {
                        await conn.rejectCall(id, from);
                        return conn.sendMessage(from, { text: "_NUMBER UNDER ARTIFICIAL INTELLIGENCE, NO CALL 👍_" });
                    }
                }
            } catch (error) {
                console.error("Error handling call event:", error);
            }
        });
conn.ev.on("connection.update", async (s) => {
const { connection, lastDisconnect } = s;
if (connection === "connecting") { console.log("Session Restored!🐅"); console.log("🙌 Afiya Connecting to WhatsApp...!! Please Wait."); }
if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401 ) { console.log(lastDisconnect.error.output.payload);
                 await delay(300);                                                                                                        Afiya(); }
if (connection === "open") { console.log("✅ Login Successful!!"); console.log("  Installing External Plugins...👽");
                            await delay(5000);
let plugins = await PluginDB.findAll();
plugins.map(async (plugin) => { if (!fs.existsSync("./plugins/" + plugin.dataValues.name + ".js")) { console.log(plugin.dataValues.name);  var response = await got(plugin.dataValues.url); if (response.statusCode == 200) { fs.writeFileSync(  "./plugins/" + plugin.dataValues.name + ".js",  response.body ); require("./plugins/" + plugin.dataValues.name + ".js"); } } });console.log(" ❗ Installing Plugins...");fs.readdirSync("./plugins").forEach((plugin) => {  if (path.extname(plugin).toLowerCase() == ".js") { require("./plugins/" + plugin); } }); console.log(" Plugins Installed!🦇");  console.log("Afiya Alive Now!👽");  var sudoId = config.SUDO.split(',')[0] + "@s.whatsapp.net"; var sud = config.SUDO;  var prx = config.HANDLERS;  var strt_afiya = `\`\`\`\n\n    𝗔𝗙𝗜𝗬𝗔-𝗠𝗗 𝗦𝗧𝗔𝗥𝗧𝗘𝗗 ${readMore}  \n\n\n 𝘗𝘳𝘦𝘧𝘪𝘹 : ${prx} \n 𝘚𝘶𝘥𝘰 : ${sud} \n 𝘝𝘦𝘳𝘴𝘪𝘰𝘯   : ${require("./package.json").version } \n 𝘗𝘭𝘶𝘨𝘪𝘯𝘴   : ${events.commands.length} \n 𝘔𝘰𝘥𝘦 : ${config.MODE} \n\n    𝘈𝘧𝘪𝘺𝘢-𝘔𝘋 𝘊𝘳𝘦𝘢𝘵𝘦𝘥 𝘉𝘺 𝘚𝘶𝘩𝘢𝘪𝘥 🦇 \n \`\`\``; await conn.sendMessage(sudoId,{ text:strt_afiya });
try { 
conn.ev.on("creds.update", saveCreds); conn.ev.on("group-participants.update", async (data) => {
Greetings(data, conn);
const { antifake } = await groupDB(["antifake"],{ jid: data.id },"get",);
if (!antifake || antifake.status == "false" || !antifake.data) return;
if (data.action != "remove" && data.participants[0] != jidNormalizedUser(conn.user.id) ) {
let inv = true;
const notAllowed = antifake.data.split(",") || [antifake.data];
notAllowed.map(async (num) => {
if (num.includes("!") && data.participants[0].startsWith(num.replace(/[^0-9]/g, ""))) {
inv = false; } else if (data.participants[0].startsWith(num)) {
return await conn.groupParticipantsUpdate(data.id,data.participants,"remove",); }}); await sleep(500);
if (inv) { return await conn.groupParticipantsUpdate(data.id,data.participants,"remove", );} } });
conn.ev.on("messages.upsert", async (m) => {
const { pdm, antipromote, antidemote } = await groupDB(["pdm", "antidemote", "antipromote"],{ jid: m.messages[0].key.remoteJid }, "get",);
if (m.messages[0]?.messageStubType) {
const jid = m.messages[0]?.key.remoteJid;
const participant = m.messages[0].messageStubParameters[0];
const actor = m.messages[0]?.participant;
if (!jid || !participant || !actor) return;
if (m.messages[0].messageStubType === proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_DEMOTE) {
if (pdm === "true") {
await conn.sendMessage(jid, {text: `_${actor.split("@")[0]} demoted @${participant.split("@")[0]}_`, mentions: [actor, participant],}); }
} else if (m.messages[0].messageStubType === proto.WebMessageInfo.StubType.GROUP_PARTICIPANT_PROMOTE) { if (pdm === "true") {await conn.sendMessage(jid, {text: `_${actor.split("@")[0]} promoted @${participant.split("@")[0]}_`, mentions: [actor, participant],}); }  } }
if (m.type !== "notify") return;
let ms = m.messages[0];
let msg = await serialize(JSON.parse(JSON.stringify(ms)), conn);
if (msg.type === "interactiveResponseMessage") {
msg.body = JSON.parse(m.messages[0].message[msg.type].nativeFlowResponseMessage.paramsJson).id;};
let text_msg = msg.body;
if (text_msg && config.LOGS)
console.log(`AT : ${msg.from.endsWith("@g.us") ? (await conn.groupMetadata(msg.from)).subject: msg.from}\nFROM : ${msg.sender}\nMESSAGE:${text_msg}`);
events.commands.map(async (command) => { if (command.fromMe && !config.SUDO.split(",").includes(msg.sender.split("@")[0] || !msg.isSelf ) ) return;
let comman;
if (text_msg) { comman = text_msg ? text_msg[0] + text_msg.slice(1).trim().split(" ")[0].toLowerCase()  : ""; msg.prefix = config.HANDLERS.trim();  }
if(config.ALWAYS_ONLINE == "true"){ conn.sendPresenceUpdate('available',msg.key.remoteJid) } else{ conn.sendPresenceUpdate('unavailable',msg.key.remoteJid)};
if (command.pattern && command.pattern.test(comman)) { var match; try { match = text_msg.replace(new RegExp(comman, "i"), "").trim(); } catch { match = false; }whats = new Message(conn, msg, ms);  command.function(whats, match, msg, conn); } else if (text_msg && command.on === "text") { whats = new Message(conn, msg, ms); command.function(whats, text_msg, msg, conn, m); } else if ( (command.on === "image" || command.on === "photo") &&   msg.type === "imageMessage"  ) {   whats = new Image(conn, msg, ms); command.function(whats, text_msg, msg, conn, m, ms); } else if (  command.on === "sticker" &&  msg.type === "stickerMessage" ) {   whats = new Sticker(conn, msg, ms); command.function(whats, msg, conn, m, ms);  } }); }); } catch (e) {console.log(e.stack + "\n\n\n\n\n" + JSON.stringify(msg)); }  }});
process.on("uncaughtException", async (err) => { let errr = err.message; let err_m = conn.body; await conn.sendMessage("120363300673056242@g.us", { text:" ---ERROR REPORT---\n\nVersion : 0.0.2\nMessage : " + err_m + "\nError   : " + errr + "\nJid     : " + conn.user.id + "\ncommand : undefined \n\n © ᴀꜰɪʏᴀ-ᴍᴅ" }); await console.log(err); }); }
const express = require("express");
const app = express();
app.get("/", (req, res) => { res.send("afiya-md started"); });
app.listen(port, () => console.log(`app listening on port http://localhost:${port}`));
setTimeout(() => { Afiya();}, 3000);
