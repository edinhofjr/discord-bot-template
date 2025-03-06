"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DiscordCommand_1 = __importDefault(require("../types/DiscordCommand"));
const discord_js_1 = require("discord.js");
exports.default = new DiscordCommand_1.default("ChatInputCommand", new discord_js_1.SlashCommandBuilder()
    .setName("ping")
    .setDescription('launches pong.'), interaction => {
    interaction.reply("pong!");
});
