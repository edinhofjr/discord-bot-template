import { Client, ClientOptions, REST, Routes } from "discord.js";
import * as path from "node:path";
import * as fs from "node:fs";
import InteractionService from "./services/InteractionHandler";
import DiscordCommand from "./types/DiscordCommand";
import process from "node:process";

export const init = async (client: Client) => {
    const commands = await loadCommands();
    await deploy(commands.map(cmd => cmd.data.toJSON())); // Aguarda o deploy terminar antes de continuar
    const interactionService = new InteractionService(commands);

    client.on("interactionCreate", async (interaction) => {
        interactionService.handle(interaction);
    });

    const TOKEN = process.env.TOKEN;
    if (!TOKEN) {
        throw new Error("Token doesn't exist");
    }

    await client.login(TOKEN);

    client.once("ready", () => {
        console.log(`Bot ${client.user?.tag} is online!`);
    });
};

const loadCommands = async (): Promise<DiscordCommand<any>[]> => {
    const commandFolderPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandFolderPath);

    const commands: DiscordCommand<any>[] = [];

    for (const commandFile of commandFiles) {
        const commandPath = path.join(commandFolderPath, commandFile);
        console.log(commandPath);
        const module = await import(commandPath);

        if (module.default) {
            commands.push(typeof module.default === "function" ? module.default() : module.default);
        }
    }

    return commands;
};

const deploy = async (commandData: any) => {
    const TOKEN = process.env.TOKEN;
    const CLIENTID = process.env.CLIENTID;
    const GUILDID = process.env.GUILDID;

    if (!TOKEN || !CLIENTID || !GUILDID) {
        throw new Error("TOKEN, CLIENTID, or GUILDID is missing in environment variables");
    }

    const rest: REST = new REST().setToken(TOKEN);
    await rest.put(
        Routes.applicationGuildCommands(CLIENTID, GUILDID),
        { body: commandData }
    );
};