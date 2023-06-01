import {PermissionFlagsBits, SlashCommandBuilder, User} from 'discord.js'
import {command} from '../../utils'


const meta = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clears the chat with specified amount of messages')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption((op) =>
        op.setName('amount')
            .setDescription('Amount of messages to clear')
            .setRequired(true)
    )
    .addUserOption((op) =>
        op.setName('user')
            .setDescription('User to clear messages from specified user')
            .setRequired(false)
    )

export default command(meta, async ({interaction, log}) => {
    const {channel, options} = interaction
    const amount: number = options.getNumber('amount', true)
    const user: User = options.getUser('user', false)

    const messageInChannel = await channel.messages.fetch()

    if (user) {
        // if user is specified will delete all messages of specified amount from specified user
        let numberOfMessage: number = 0;
        const messageOfUser = messageInChannel.filter((msg) => {
            if (msg.author.id === user.id && numberOfMessage <= amount) {
                numberOfMessage++
                return true
            } else {
                return false
            }
        });

        await channel.bulkDelete(messageOfUser, true)
        await interaction.reply(`🗑️ Deleted ${numberOfMessage} messages from ${user.username}`)
        log(`${interaction.user.tag} deleted ${numberOfMessage} messages from ${user.username}} at ${new Date().toLocaleString("th-TH", {
            timeZone: "Asia/Bangkok",
        })}`)
    } else {
        // if user is not specified will delete all messages of specified amount
        await channel.bulkDelete(amount, true)
        await interaction.reply(`🗑️ Deleted ${amount} messages`)
        log(`${interaction.user.tag} deleted ${amount} messages at ${new Date().toLocaleString("th-TH", {
            timeZone: "Asia/Bangkok",
        })} `)
    }
})
