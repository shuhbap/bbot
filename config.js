const { Sequelize } = require("sequelize");
const fs = require("fs");
if (fs.existsSync("config.env"))
  require("dotenv").config({ path: "./config.env" });

const toBool = (x) => x == "true";

DATABASE_URL = process.env.DATABASE_URL || "./lib/database.db";
let HANDLER = "false";
module.exports = {
  ANTILINK: toBool(process.env.ANTI_LINK) || false,
  LOGS: toBool(process.env.LOGS) || true,
  ANTILINK_ACTION: process.env.ANTI_LINK || "kick",
  WARN_COUNT:process.env.WARN_COUNT || 3,
  SESSION_ID:process.env.SESSION_ID || "", //Afiya session here
  IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f", "deb80cd12ababea1c9b9a8ad6ce3fab2", "78c84c62b32a88e86daf87dd509a657a"],
  AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || "false",
  AUTO_READ: process.env.AUTO_READ || "false",
  GEMINI_API: process.env.GEMINI_API || "AIzaSyAhfZhNT0p517KTg6DRxj34hF1labEW0Uw",
  ALIVE_DATA : process.env.ALIVE_DATA || "Hello &sender i am alive now",
  HANDLERS: process.env.PREFIX === 'false' ? '^' : process.env.PREFIX === 'null' ? '^' : process.env.PREFIX,
  RMBG_KEY: process.env.RMBG_KEY || false,
  BRANCH: "main",
  STICKER_DATA: process.env.STICKER_DATA || "𝐴𝑓𝑖𝑦𝑎-𝑀𝐷;𝑆𝑢ℎ𝑎𝑖𝑑",
  BOT_INFO: process.env.BOT_INFO || "ᴀꜰɪʏᴀ-ᴍᴅ;ꜱᴜʜᴀɪᴅ;https://i.imgur.com/f0MhRnW.png",
  AUDIO_DATA: process.env.AUDIO_DATA || "𝑆𝑢ℎ𝑎𝑖𝑑;𝐴𝑓𝑖𝑦𝑎-𝑀𝐷;https://i.ibb.co/jMYcbr7/768c2da56e75.jpg",
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "false", //bot number always online make true
  BGMBOT: process.env.BGMBOT || "false",
  CAPTION: process.env.CAPTION || "created by Afiya-MD", //video caption
  MODE: process.env.MODE || "private",
  CALL_REJECT: process.env.CALL_REJECT || "false", //make true, for on call reject
  DATABASE_URL: DATABASE_URL,
  DATABASE:
    DATABASE_URL === "./lib/database.db"
      ? new Sequelize({
          dialect: "sqlite",
          storage: DATABASE_URL,
          logging: false,
        })
      : new Sequelize(DATABASE_URL, {
          dialect: "postgres",
          ssl: true,
          protocol: "postgres",
          dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
          },
          logging: false,
        }),
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || " ",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || " ",
  SUDO: process.env.SUDO || "919207226553",
};
