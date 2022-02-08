"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./models/db"));
const body_parser_1 = __importDefault(require("body-parser"));
require("./config/passport-setup");
const passport_1 = __importDefault(require("passport"));
// routers
const files_1 = __importDefault(require("./routes/files"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const links_1 = __importDefault(require("./routes/links"));
const images_1 = __importDefault(require("./routes/images"));
const shareLinkHandler_1 = __importDefault(require("./routes/shareLinkHandler"));
const errorHandler_1 = __importDefault(require("./controllers/errorHandler"));
const sessionMiddleware_1 = __importDefault(require("./utils/sessionMiddleware"));
const websockets_1 = __importDefault(require("./sockets/websockets"));
const express_ws_1 = __importDefault(require("express-ws"));
const sharedbWs_1 = __importDefault(require("./sockets/sharedbWs"));
// winston.createLogger({
//   level: 'warn',
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     winston.format.printf((info) => `[${info.timestamp}] ${info.stack}`)
//   ),
//   transports: [
//     new winston.transports.File({
//       filename: './log/error.log',
//       handleExceptions: true,
//     }),
//   ],
//   exitOnError: false,
// });
db_1.default.setUPConnection();
const { app } = (0, express_ws_1.default)((0, express_1.default)());
app.use(sessionMiddleware_1.default);
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.text());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.ws('/custom/:file', websockets_1.default);
app.ws('/sharedb', sharedbWs_1.default);
// login handler
app.use('/auth', auth_1.default);
// work with users
app.use('/user', users_1.default);
// work with files
app.use('/file', files_1.default);
// create links
app.use('/link', links_1.default);
// handle links
app.use('/share', shareLinkHandler_1.default);
// handle images and create it
app.use('/img', images_1.default);
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../client/build')));
app.get('/*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '../../client/build/index.html'));
});
// error handler
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map