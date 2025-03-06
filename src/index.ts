import {init} from "./init";
import {Client} from "discord.js";

init(
    new Client({
        intents: []
    })
).then(_ => console.log("Successfully connected to the server!"));