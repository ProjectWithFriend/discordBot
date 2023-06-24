import { EmbedBuilder } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import { event, randomColor4Chat } from "../utils";
import keys from "../keys";

const configuration = new Configuration({
  apiKey: keys.OPENAI_API_KEY,
  organization: keys.OPENAI_ORGANIZATION_ID,
});

const openai = new OpenAIApi(configuration);

export default event("messageCreate", async ({ client, log }, message) => {
  try {
    if (message.author.bot) return;
    // if (!message.content.startsWith("gpt:")) return;
    const gptResponse = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `ChatGPT is a friendly chatbot. \n\
      ChatGPT: Hello, how are you today?\n\
      ${message.author.username}: ${message.content}\n\
      ChatGPT:
      `,
      max_tokens: 100,
      temperature: 0.9,
      stop: ["ChatGPT:", "AuJung"],
    });
    message.reply(`Chatgpt: ${gptResponse.data.choices[0].text}`);
    return;
  } catch (e) {
    console.log(e);
  }
});
