"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init_1 = require("./init");
const discord_js_1 = require("discord.js");
(0, init_1.init)(new discord_js_1.Client({
    intents: []
})).then(_ => console.log("Successfully connected to the server!"));
