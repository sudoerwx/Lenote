"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.file = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const file = new mongoose_1.default.Schema({
    name: String,
    nameHash: String,
    ownerId: String,
    ownerName: String,
    allowedPeople: [String],
}, { _id: false });
exports.file = file;
const userSchema = new mongoose_1.default.Schema({
    _id: { type: String, required: true },
    name: String,
    secondName: String,
    email: String,
    photoURI: String,
    ownFiles: [file],
    secondFiles: [file],
});
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
//# sourceMappingURL=userSchema.js.map