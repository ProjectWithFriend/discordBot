import {config} from 'dotenv'
import {resolve} from 'path'

/*
    * This script is used to deploy commands to Discord.
    * If you create new commands, you will need to run this script before they will work.
 */
config({path: resolve(__dirname, '../../.env')})

import {APIUser, REST, Routes} from 'discord.js'
import commands from '../commands' //This is collect all categories of commands
import keys from '../keys' //If you want to use .env should use after config

/*
    * This code will extract the command
    * first map method will extract the commands from the categories
    * second map method will extract the meta data from the commands
    * flat method will flatten the array make array to be one dimensional
 */
const body = commands.map(({commands}) =>
    commands.map(({meta}) => meta)
).flat()

/*
    * This code will create a new REST client
    * This client will be used to send the request to Discord
 */
const rest = new REST({version: '10'}).setToken(keys.clientToken)


/*
    * This code deploy the commands to Discord
 */
async function main() {
    const currentUser = await rest.get(Routes.user()) as APIUser

    const endpoint = process.env.NODE_ENV === 'production'
        ? Routes.applicationCommands(currentUser.id)
        : Routes.applicationGuildCommands(currentUser.id, keys.GuildId)

    await rest.put(endpoint, {body})

    return currentUser
}

main()
    .then((user) => {
        const tag = `${user.username}#${user.discriminator}`
        const response = process.env.NODE_ENV === 'production'
            ? `Successfully released commands in production as ${tag}!`
            : `Successfully registered commands for development in ${keys.GuildId} as ${tag}!`

        console.log(response)
    })
    .catch(console.error)