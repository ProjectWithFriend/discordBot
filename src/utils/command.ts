import { Command, CommandExec, CommandCategory, CommandMeta } from '../types'

/*
    * @param meta - The meta data for the command
    * @param exec - The function to execute when the command is called
 */
export function command(meta: CommandMeta, exec: CommandExec): Command {
    return { meta, exec }
}

/*
    * @param name - The name of the category
    * @param commands - The commands in the category
 */
export function category(name: string, commands: Command[]): CommandCategory {
    return { name, commands }
}