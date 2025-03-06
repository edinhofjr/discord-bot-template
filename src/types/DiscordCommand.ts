import Interaction, {
    ButtonInteraction,
    ChatInputCommandInteraction,
    CommandInteraction,
    SlashCommandAssertions,
    SlashCommandBuilder
} from "discord.js";

import {DiscordEventInteractionsMap} from "./Interactions";

export interface DiscordCommandType<T extends keyof DiscordEventInteractionsMap> {
    data: SlashCommandBuilder;
    type: T;
    callback: (interaction: DiscordEventInteractionsMap[T]) => void;
}

export default class DiscordCommand<T extends keyof DiscordEventInteractionsMap> implements DiscordCommandType<T>{
    data: SlashCommandBuilder;
    type: T;
    callback: (interaction: DiscordEventInteractionsMap[T]) => void;

    constructor(type: T, data: SlashCommandBuilder, callback: (interaction: DiscordEventInteractionsMap[T]) => void) {
        this.data = data;
        this.callback = callback;
        this.type = type;
    }
}

