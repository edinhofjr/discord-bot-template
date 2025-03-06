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

const commandContainer = new Map<Function, DiscordCommand<any>>();

export const discordCommands: DiscordCommand<any>[] = [];

const commandRegistry = new Map<string, DiscordCommand<any>>();

function Command(): ClassDecorator {
    return (target: any) => {
        const instance = new target();
        commandRegistry.set(instance.name, instance);
    };
}

@Command()
export default class DiscordCommand<T extends keyof DiscordEventInteractionsMap> implements DiscordCommandType<T>{
    data: SlashCommandBuilder;
    type: T;
    callback: (interaction: DiscordEventInteractionsMap[T]) => void;

    constructor(type: T, data: SlashCommandBuilder, callback: (interaction: DiscordEventInteractionsMap[T]) => void) {
        this.data = data;
        this.callback = callback;
        this.type = type;
        discordCommands.push(this);
    }
}

