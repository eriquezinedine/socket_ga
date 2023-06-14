"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const serverExpress = new app_1.default();
const app = serverExpress.listen;
const httpServer = (0, http_1.createServer)(app);
const PORT = 6969;
httpServer.listen(PORT, () => {
    console.log(`Servidor Sockets run en el puerto http://192.168.0.7:${PORT}`);
});
const io = new socket_io_1.Server(httpServer);
exports.default = io;
require("./socket/socket");
