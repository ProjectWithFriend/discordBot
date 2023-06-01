import {EmbedBuilder} from 'discord.js'
import {event, randomColor4Chat} from "../utils";


export default event('guildMemberAdd', async (
    {
        client,
        log
    },
    guildMember
) => {
    const member = guildMember.user
    const embed = {
        title: `Welcome to the server, ${member.toString()}`,
        description: `We're glad you're here! ${member.tag}. Welcome to our community. We value your presence and are excited to have you join us. Whether you're a new member or a returning one, we want you to know that your presence matters to us.`,
        image: {
            url: member.displayAvatarURL()
        },
        footer: {
            text: `Member #${guildMember.guild.memberCount} \n
             Click the button below to verify yourself and gain the role.
            `,
        },
        color: randomColor4Chat(),
    }
    const embedBuilder = new EmbedBuilder(embed)


    //send the welcome message to the user with verify button
    await guildMember.send({embeds: [embedBuilder]})
    log(`Sent welcome message to ${member.tag}`)
})