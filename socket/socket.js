"use strict";
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
const index_1 = __importDefault(require("../index"));
let cacheData = [];
const nameSocket = index_1.default.of("/zine/socket");
nameSocket.on("connection", (client) => {
    console.log("cliente conectado");
    client.on("join-selection", (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Creando nuevo canal", data);
        // client.join(data)
        // nameSocket.emit("canal", `${data}`);
    }));
    client.on("connection_alumn", (alumno) => __awaiter(void 0, void 0, void 0, function* () {
        cacheData.push(alumno);
        nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
    }));
    client.on("add_circle", (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { idAlumno, offset } = data;
        const dataItemIndex = cacheData.findIndex((item) => item.id === idAlumno);
        if (dataItemIndex !== -1) {
            cacheData[dataItemIndex].offsets.push(offset);
        }
        nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
    }));
    client.on("removeLast", (idAlumno) => {
        const dataItemIndex = cacheData.findIndex((item) => item.id === idAlumno);
        if (dataItemIndex !== -1) {
            const offsets = cacheData[dataItemIndex].offsets;
            if (offsets.length > 0) {
                offsets.pop(); // Elimina el último elemento de la lista offsets
                nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
            }
        }
    });
    client.on("removeAll", (idAlumno) => {
        const dataItemIndex = cacheData.findIndex((item) => item.id === idAlumno);
        if (dataItemIndex !== -1) {
            cacheData[dataItemIndex].offsets = []; // Elimina todos los elementos de la lista offsets
            nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
        }
    });
    client.on("event_home", (data) => __awaiter(void 0, void 0, void 0, function* () {
        nameSocket.emit("onEventHome", JSON.stringify(data));
        // nameSocket.to()
    }));
    client.on("delete_all", (_) => __awaiter(void 0, void 0, void 0, function* () {
        cacheData = [];
        nameSocket.emit("list_alumn", JSON.stringify({ listAlumno: cacheData })); // Emito el mensaje a todos.
    }));
    client.on("disconnect", () => {
        console.log("cliente desconectado");
        // Realiza cualquier acción necesaria cuando el cliente se desconecta.
        // ...
    });
});
