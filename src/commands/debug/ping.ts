import { SlashCommandBuilder } from 'discord.js'
import { command } from '../../utils'

const meta = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')

export default command(meta, ({ interaction, log}) =>{
    interaction.reply('pong!')
    log(`${interaction.user.tag} pinged me! 🏓 at ${new Date().toLocaleString("th-TH", {
        timeZone: "Asia/Bangkok",
    })}`)
})