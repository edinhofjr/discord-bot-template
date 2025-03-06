"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const discord_js_1 = require("discord.js");
const path = __importStar(require("node:path"));
const fs = __importStar(require("node:fs"));
const InteractionHandler_1 = __importDefault(require("./services/InteractionHandler"));
const node_process_1 = __importDefault(require("node:process"));
const init = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const commands = yield loadCommands();
    yield deploy(commands.map(cmd => cmd.data.toJSON())); // Aguarda o deploy terminar antes de continuar
    const interactionService = new InteractionHandler_1.default(commands);
    client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
        interactionService.handle(interaction);
    }));
    const TOKEN = node_process_1.default.env.TOKEN;
    if (!TOKEN) {
        throw new Error("Token doesn't exist");
    }
    yield client.login(TOKEN);
    client.once("ready", () => {
        var _a;
        console.log(`Bot ${(_a = client.user) === null || _a === void 0 ? void 0 : _a.tag} is online!`);
    });
});
exports.init = init;
const loadCommands = () => __awaiter(void 0, void 0, void 0, function* () {
    const commandFolderPath = path.join(__dirname, "commands");
    const commandFiles = fs.readdirSync(commandFolderPath);
    const commands = [];
    for (const commandFile of commandFiles) {
        const commandPath = path.join(commandFolderPath, commandFile);
        console.log(commandPath);
        const module = yield Promise.resolve(`${commandPath}`).then(s => __importStar(require(s)));
        if (module.default) {
            commands.push(typeof module.default === "function" ? module.default() : module.default);
        }
    }
    return commands;
});
const deploy = (commandData) => __awaiter(void 0, void 0, void 0, function* () {
    const TOKEN = node_process_1.default.env.TOKEN;
    const CLIENTID = node_process_1.default.env.CLIENTID;
    const GUILDID = node_process_1.default.env.GUILDID;
    if (!TOKEN || !CLIENTID || !GUILDID) {
        throw new Error("TOKEN, CLIENTID, or GUILDID is missing in environment variables");
    }
    const rest = new discord_js_1.REST().setToken(TOKEN);
    yield rest.put(discord_js_1.Routes.applicationGuildCommands(CLIENTID, GUILDID), { body: commandData });
});
