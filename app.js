"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const express_1 = __importDefault(require("express"));
class ServerExpress {
    constructor() {
        this.app = (0, express_1.default)();
        this.user = "/user";
        this.middleware();
        this.routes();
    }
    middleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json({ limit: "50mb" }));
        this.app.use(express_1.default.static("./public"));
        this.app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
    }
    routes() {
        this.app.use(this.user, user_routes_1.default);
    }
    get listen() {
        return this.app;
    }
}
exports.default = ServerExpress;
