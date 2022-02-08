"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    img: { data: Buffer, contentType: String },
    createdAt: { type: Date, expires: 2592000, default: Date.now },
});
const Image = mongoose_1.default.model('image', image);
exports.default = Image;
//# sourceMappingURL=ImageSchema.js.map