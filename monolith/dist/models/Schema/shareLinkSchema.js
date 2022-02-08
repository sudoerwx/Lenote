"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = require("./userSchema");
const link = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    sharedFile: userSchema_1.file,
    createdAt: { type: Date, expires: 86400, default: Date.now },
});
const ShareLink = mongoose_1.default.model('link', link);
exports.default = ShareLink;
//# sourceMappingURL=shareLinkSchema.js.map