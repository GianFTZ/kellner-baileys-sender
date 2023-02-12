"use strict";
exports.__esModule = true;
exports.Alerts = void 0;
var Alerts = /** @class */ (function () {
    function Alerts() {
    }
    Alerts.initializing = function () {
        console.log("✅ Making wa-socket connection");
    };
    Alerts.connectionSuccessful = function () {
        console.log("✅ Connected successfully");
    };
    Alerts.unexpectedClose = function (err, shouldReconnect) {
        console.log('❌ Connection closed due to ', err, ', reconnecting ', shouldReconnect);
    };
    return Alerts;
}());
exports.Alerts = Alerts;
