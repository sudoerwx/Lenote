"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.createFile = void 0;
// @ts-ignore
const ot_text_1 = require("ot-text");
const sharedb_1 = __importStar(require("sharedb"));
// @ts-ignore
const sharedb_mongo_1 = __importDefault(require("sharedb-mongo"));
const websocket_json_stream_1 = __importDefault(require("@soundation/websocket-json-stream"));
const wsdb = (0, sharedb_mongo_1.default)((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGODB_URI);
const share = new sharedb_1.default({ db: wsdb });
const shareConn = share.connect();
sharedb_1.types.register(ot_text_1.type);
const sharedbWs = (shareWss) => {
    const stream = new websocket_json_stream_1.default(shareWss);
    share.listen(stream);
};
const createFile = (name, data) => {
    var doc = shareConn.get('docs', name);
    doc.fetch((err) => {
        if (err)
            throw err;
        if (doc.type === null) {
            // @ts-ignore
            doc.create(data || '#Hello', 'text');
        }
    });
};
exports.createFile = createFile;
const deleteFile = (name) => {
    var doc = shareConn.get('docs', name);
    doc.fetch((err) => {
        if (err)
            throw err;
        if (doc.type !== null) {
            doc.del({}, (err) => {
                if (err)
                    throw err;
            });
        }
    });
};
exports.deleteFile = deleteFile;
exports.default = sharedbWs;
//# sourceMappingURL=sharedbWs.js.map