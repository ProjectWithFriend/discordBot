import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("randomnumber")
  .setDescription(
    "Replies with random number! if you don't set min and max it will be 0-100"
  )
  .addIntegerOption((option) =>
    option.setName("min").setDescription("Minimum number")
  )
  .addIntegerOption((option) =>
    option.setName("max").setDescription("Maximum number")
  );

export default command(meta, ({ interaction, log }) => {
  const min = interaction.options.getInteger("min") ?? 0;
  const max = interaction.options.getInteger("max") ?? 100;
  if (min > max) {
    interaction.reply("Minimum number must be less than maximum number.");
  } else {
    interaction.reply(
      `Your ranom number is ${
        Math.floor(Math.random() * (max - min + 1)) + min
      }`
    );
  }
  log(
    `${
      interaction.user.tag
    } used randomnumber command! at ${new Date().toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
    })}`
  );
});
