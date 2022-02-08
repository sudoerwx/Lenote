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
const express_1 = __importDefault(require("express"));
const md5_1 = __importDefault(require("md5"));
const sharedbWs_1 = require("../sockets/sharedbWs");
const userSchema_1 = __importDefault(require("../models/Schema/userSchema"));
const router = express_1.default.Router();
/**
 * create file and  send all user file
 */
router.post('/:file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }
    const user = yield userSchema_1.default.findById(req.user._id);
    user.ownFiles.push({
        name: req.params.file,
        nameHash: (0, md5_1.default)(req.params.file + user._id),
        ownerId: user._id,
        ownerName: user.name,
        allowedPeople: [],
    });
    user.save();
    (0, sharedbWs_1.createFile)(user.ownFiles[user.ownFiles.length - 1].nameHash);
    res.send(user.ownFiles[user.ownFiles.length - 1].nameHash);
}));
/**
 * delete file and send 200 code
 */
router.delete('/:file', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }
    const user = yield userSchema_1.default.findById(req.user._id);
    let ownFileIndex = user.ownFiles.findIndex((element) => element.nameHash.localeCompare(req.params.file) === 0 ? true : false);
    let ownFile = user.ownFiles[ownFileIndex];
    let ownFileId = ownFile && ownFile.nameHash;
    let secondFileIndex = user.secondFiles.findIndex((element) => element.nameHash.localeCompare(req.params.file) === 0 ? true : false);
    let secondFile = user.secondFiles[secondFileIndex];
    let secondFileId = secondFile && secondFile.nameHash;
    if (!ownFileId && !secondFileId)
        return;
    if (ownFileId) {
        user.ownFiles[ownFileIndex].allowedPeople.forEach((element) => __awaiter(void 0, void 0, void 0, function* () {
            const allowedUser = yield userSchema_1.default.findById(element);
            allowedUser.secondFiles.forEach((file, i) => {
                if (file.nameHash.localeCompare(ownFileId) === 0 ? true : false) {
                    allowedUser.secondFiles.splice(i, 1);
                }
                allowedUser.save();
            });
        }));
        (0, sharedbWs_1.deleteFile)(ownFileId);
        user.ownFiles.splice(ownFileIndex, 1);
    }
    else {
        let x = 1;
        const owner = yield userSchema_1.default.findById(user.secondFiles[secondFileIndex].ownerId);
        owner.ownFiles.forEach((file, i) => {
            if (file.nameHash.localeCompare(secondFileId) === 0 ? true : false) {
                owner.ownFiles[i].allowedPeople.forEach((element, peopleIndex) => {
                    if (element === user._id) {
                        owner.ownFiles[i].allowedPeople.splice(peopleIndex, 1);
                    }
                });
            }
            owner.save();
        });
        user.secondFiles.splice(secondFileIndex, 1);
    }
    user.save();
    res.sendStatus(200);
}));
exports.default = router;
//# sourceMappingURL=files.js.map