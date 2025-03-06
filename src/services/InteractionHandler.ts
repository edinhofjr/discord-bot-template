import {BaseInteraction, ChatInputCommandInteraction, Events} from "discord.js";
import {DiscordEventInteractionsMap} from "../types/Interactions";
import DiscordCommand from "../types/DiscordCommand";

export default class InteractionHandler {
    private readonly commands: Map<String, DiscordCommand<any>[]>;

    constructor(commands: DiscordCommand<any>[]) {
        this.commands = new Map();
        commands.forEach(
            command => {
                this.commands.set(command.type, []);
            }
        )

        commands.forEach(
            command => {
                this.commands.get(command.type)?.push(command);
            }
        )
        console.log(this.commands);
    }

    handle(interaction: BaseInteraction) {
        this.commands.forEach(
            (cb, key) => {
                if ((interaction as any)["is" + key]()) {
                    this.commands.get(key)?.forEach(v => v.callback(interaction));
                }
            }
        )
    }
}
