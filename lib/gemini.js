const { fromBuffer } = require("file-type");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { getJson } = require("../lib/");

require("dotenv").config();

const genAI = new GoogleGenerativeAI("AIzaSyAhfZhNT0p517KTg6DRxj34hF1labEW0Uw");

function fileToGenerativePart(buff, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(buff).toString("base64"),
      mimeType,
    },
  };
}

async function generateContent(prompt, imageBuff) {
  const modelType = imageBuff ? "gemini-pro-vision" : "gemini-pro";
  const model = genAI.getGenerativeModel({ model: modelType });
  const result = await model.generateContent([
    prompt,
    fileToGenerativePart(
      imageBuff,
      imageBuff && (await fromBuffer(imageBuff)).mime
    ),
  ]);

  return result.response.text();
}

async function gemini(prompt, imageBuff, options) {
  const { promptText, promptImage } = await getJson(
    `https://gist.githubusercontent.com/SKL-86/08b943887506c747db9958cca7bd6498/raw/dc2f12d2b8dbb1f55915a2ce7b6d64c121bb5d44/Gemini.js`
  );

  try {
    if (imageBuff) {
      prompt = promptImage + prompt;
      return await generateContent(prompt, imageBuff);
    } else {
      prompt = promptText + prompt;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    }
  } catch (error) {
    return error.message.replace("[GoogleGenerativeAI Error]:", "");
  }
}

module.exports = gemini;
