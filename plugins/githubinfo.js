const githubstalk = require("../lib/github");
const axios = require("axios");
const { command, isPrivate } = require("../lib");

  
command(
    {
        pattern: "github info",
        fromMe: isPrivate,
        desc: "github profile search",
        type: "search",
    },
    async (message, match) => {
    	
  if (!match) {
    return await message.reply("*_Provide a GitHub username to fetch information_*");
  }

  try {
    const userData = await githubstalk(match); // Use the imported githubstalk function

    if (userData) {
      const responseMessage = `*_GitHub User Info_*\n\n` +
        `*Username* : ${userData.username}\n` +
        `*Name* : ${userData.name || "-"}\n` +
        `*Bio* : ${userData.bio || "-"}\n\n` +
        `*ID* : ${userData.id}\n` +
        `*Profile URL* : ${userData.url}\n` +
        `*Type* : ${userData.type}\n` +
        `*Company* : ${userData.company || "-"}\n` +
        `*Blog* : ${userData.blog || "-"}\n` +
        `*Location* : ${userData.location || "-"}\n` +
        `*Email* : ${userData.email || "-"}\n` +
        `*Public Repos* : ${userData.publicRepos}\n` +
        `*Public Gists* : ${userData.publicGists}\n` +
        `*Followers* : ${userData.followers}\n` +
        `*Following* : ${userData.following}\n` +
        `*Account Created At* : ${userData.createdAt}\n` +
        `*Last Updated At* : ${userData.updatedAt}`;

      // Send the response message
      await message.reply(responseMessage);
    } else {
      await message.reply("*User not found*");
    }
  } catch (error) {
    console.log(error);
    await message.reply("*Error*");
  }
   });
