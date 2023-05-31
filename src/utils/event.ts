import {Event, EventKeys, EvenExec} from '../types'
import { Client } from 'discord.js'


/*
    * This function create Event object to be stored in events array in src\events\index.ts
 */
export function event<T extends EventKeys> (id: T, exec: EvenExec<T>): Event<T> {
    return { id, exec }
}


/*
    * This function register all the events in src\events\index.ts
 */
export function registerEvents(client: Client, events: Event<any>[]) : void{
    for (const event of events) {
        client.on(event.id, async (...args) =>{
            const props = {
                client,
                //implementing LogFunction for each event
                //because we only define it to be type of LogFunction in src\utils\event.ts
                log: (...args: any[]) => console.log(`[${event.id}]`, ...args)
            }
            try{
                await event.exec(props, ...args)
            }catch(err){
                console.error(`[${event.id}]`, err)
            }
        })
    }
}