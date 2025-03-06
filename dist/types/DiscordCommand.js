"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscordCommand {
    constructor(type, data, callback) {
        this.data = data;
        this.callback = callback;
        this.type = type;
    }
}
exports.default = DiscordCommand;
