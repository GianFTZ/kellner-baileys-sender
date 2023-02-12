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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.eventListener = void 0;
var baileys_1 = require("@adiwajshing/baileys");
var env_1 = __importDefault(require("../../config/env"));
var fs = __importStar(require("fs"));
var error_1 = require("../error");
var alerts_1 = require("../alerts");
var eventListener = function (client, starter, launcher) {
    client.ev.on('connection.update', function (update) {
        var _a;
        var connection = update.connection, lastDisconnect = update.lastDisconnect;
        if (connection === 'close') {
            var error = lastDisconnect.error;
            var statusCode = (_a = error === null || error === void 0 ? void 0 : error.output) === null || _a === void 0 ? void 0 : _a.statusCode;
            lastDisconnect.error;
            var shouldReconnectArray = error_1.DisconnectReasons;
            var shouldReconnect = shouldReconnectArray.includes(statusCode);
            if (shouldReconnect) {
                return launcher.buildProps();
            }
            if (statusCode == baileys_1.DisconnectReason.loggedOut) {
                fs.unlinkSync(env_1["default"].SESSION_PATH);
                return launcher.buildProps();
            }
            alerts_1.Alerts.unexpectedClose(error, shouldReconnect);
            process.exit();
        }
        else if (connection === 'open') {
            alerts_1.Alerts.connectionSuccessful();
            console.log(update);
            client.sendMessage('120363046412489809@g.us', {
                text: "consumer is ready"
            });
        }
    });
    client.ev.on('creds.update', (function (authCreds) {
        starter.saveCreds();
    }));
    return client;
};
exports.eventListener = eventListener;
