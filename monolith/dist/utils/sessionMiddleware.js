"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const middleware = (0, express_session_1.default)({
    secret: ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.SESSION_SECRET) || '',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 604800000 },
    store: connect_mongo_1.default.create({
        mongoUrl: ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.MONGODB_URI) || '',
    }),
});
exports.default = middleware;
//# sourceMappingURL=sessionMiddleware.js.map