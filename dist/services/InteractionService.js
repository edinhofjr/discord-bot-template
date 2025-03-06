"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InteractionService {
    constructor(commands) {
        this.commands = new Map();
        commands.forEach(command => {
            this.commands.set(command.type, []);
        });
        commands.forEach(command => {
            var _a;
            (_a = this.commands.get(command.type)) === null || _a === void 0 ? void 0 : _a.push(command);
        });
        console.log(this.commands);
    }
    handle(interaction) {
        this.commands.forEach((cb, key) => {
            var _a;
            if (interaction["is" + key]()) {
                console.log(true);
                (_a = this.commands.get(key)) === null || _a === void 0 ? void 0 : _a.forEach(v => v.callback(interaction));
            }
        });
    }
}
exports.default = InteractionService;
