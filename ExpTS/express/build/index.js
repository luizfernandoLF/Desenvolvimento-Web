"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const requestLogger_1 = require("./middlewares/requestLogger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use((0, requestLogger_1.requestLogger)('completo'));
app.get("/", (req, res) => {
    res.send("Hello world!");
});
app.get("/teste", (req, res) => {
    res.send("Página de teste!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
