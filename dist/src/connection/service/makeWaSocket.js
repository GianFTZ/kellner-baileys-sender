"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.makeWaSocket = void 0;
var baileys_1 = __importDefault(require("@adiwajshing/baileys"));
var pino_1 = __importDefault(require("pino"));
var makeWaSocket = function (state) {
    return (0, baileys_1["default"])({
        markOnlineOnConnect: true,
        printQRInTerminal: true,
        browser: ['Teste BOT', "Safari", "3.0"],
        logger: (0, pino_1["default"])({ level: "fatal" }),
        auth: state,
        emitOwnEvents: true
    });
};
exports.makeWaSocket = makeWaSocket;
