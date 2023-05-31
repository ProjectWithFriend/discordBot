import { category } from "../../utils";
import ping from "./ping";
import cpe64 from "./cpe64";

/*
    * This file will create a new category of commands
    * If you create new just create new category and add it here
 */
export default category('Debug', [ping, cpe64])