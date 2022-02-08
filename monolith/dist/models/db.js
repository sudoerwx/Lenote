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
exports.setUPConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * setup mongoose connection
 */
const setUPConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield mongoose_1.default.connect(((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGODB_URI) || '', {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});
exports.setUPConnection = setUPConnection;
exports.default = { setUPConnection: exports.setUPConnection };
//# sourceMappingURL=db.js.map