"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
//import router from './router';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
server.listen(process.env.PORT, () => {
    console.log('Server running on http://localhost:' + process.env.PORT);
});
// mongoose.connect(process.env.MONGO_URL)
//     .then(() => {
//         console.log("Mongoose connected");
//         server.listen(process.env.PORT, () => {
//           console.log('Server running on http://localhost:'+process.env.PORT);
//         });
//     })
//     .catch(console.error);
//# sourceMappingURL=index.js.map