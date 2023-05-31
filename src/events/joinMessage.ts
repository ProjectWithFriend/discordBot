import { EmbedBuilder } from 'discord.js'
import {event} from "../utils";
import keys from "../keys";


export default event('guildMemberAdd', async (
    {
        client,
        log
    },
    guildMember
) =>{
    const channel = await client.channels.cache.get(keys.JOIN_MSG_CHANNEL_ID)
    if(!channel) return log('Channel not found')
    const member = guildMember.user
    const embed = {
        title: `Welcome to the server, ${member.toString()}`,
        description: `We're glad you're here!`,
        image: {
            url: member.displayAvatarURL()
        },
        footer: {
            text: `Member #${guildMember.guild.memberCount}`,
            thumbnail: {
                url: guildMember.guild.iconURL()
            }
        },
        color: 0x00ff00,
    }
    const embedBuilder = new EmbedBuilder(embed)

    //send the embed to the channel
    if(!channel.isTextBased()) return log('Channel is not text based')
    await channel.send({embeds: [embedBuilder]})
})