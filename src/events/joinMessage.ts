import { EmbedBuilder } from 'discord.js'
import {event, randomColor4Chat} from "../utils";
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
        description: `We're glad you're here! ${member.tag}. Welcome to our community. We value your presence and are excited to have you join us. Whether you're a new member or a returning one, we want you to know that your presence matters to us.`,
        image: {
            url: member.displayAvatarURL()
        },
        footer: {
            text: `Member #${guildMember.guild.memberCount}`,
        },
        color: randomColor4Chat(),
    }
    const embedBuilder = new EmbedBuilder(embed)

    //send the embed to the channel
    if(!channel.isTextBased()) return log('Channel is not text based')
    await channel.send({embeds: [embedBuilder]})
    log(`Sent welcome message to ${member.tag}`)
})