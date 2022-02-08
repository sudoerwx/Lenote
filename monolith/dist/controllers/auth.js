"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleCallback = exports.googleLogin = void 0;
const passport_1 = __importDefault(require("passport"));
exports.googleLogin = passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
});
exports.googleCallback = passport_1.default.authenticate('google', {
    successRedirect: process.env.NODE_ENV ? '/' : 'http://localhost:3000/',
    failureRedirect: '/auth/google',
});
//# sourceMappingURL=auth.js.map