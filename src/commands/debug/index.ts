import { category } from "../../utils";
import ping from "./ping";

/*
    * This file will create a new category of commands
    * If you create new just create new category and add it here
 */
export default category('Debug', [ping])