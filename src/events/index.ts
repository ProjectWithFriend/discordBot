import { Event } from "../types";
import ready from "./ready";
import interactionCreate from "./interactionCreate";
import joinMessage from "./joinMessage";
import chatGPT from "./chatGPT";

/*
 * events is an array of all the events
 * You can see type Event in src\types\events.ts to check what it is
 */
const events: Event<any>[] = [ready, interactionCreate, joinMessage];

export default events;
