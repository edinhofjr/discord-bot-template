import DiscordCommand, {DiscordCommandType} from "../types/DiscordCommand";
import {ChatInputCommandInteraction, CommandInteraction, SlashCommandBuilder} from "discord.js";

export default new DiscordCommand(
    "ChatInputCommand",
    new SlashCommandBuilder()
        .setName("ping")
        .setDescription('launches pong.'),
    interaction => {
        interaction.reply("pong!")
    }
)

