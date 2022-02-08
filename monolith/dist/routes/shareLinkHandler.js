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
const userSchema_1 = __importDefault(require("../models/Schema/userSchema"));
const shareLinkSchema_1 = __importDefault(require("../models/Schema/shareLinkSchema"));
const router = express_1.default.Router();
router.get('/:nameHash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const currentLink = yield shareLinkSchema_1.default.findById(req.params.nameHash);
        if (currentLink) {
            const secondFileId = req.user.secondFiles.findIndex(({ nameHash }) => nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0
                ? true
                : false);
            const ownFileId = req.user.ownFiles.findIndex(({ nameHash }) => nameHash.localeCompare(currentLink.sharedFile.nameHash) === 0
                ? true
                : false);
            if (secondFileId === -1 && ownFileId === -1) {
                const user = yield userSchema_1.default.findById(req.user._id);
                currentLink.sharedFile.allowedPeople.push(user._id);
                user.secondFiles.push(currentLink.sharedFile);
                const owner = yield userSchema_1.default.findById(currentLink.sharedFile.ownerId);
                owner.ownFiles.forEach((element, index, array) => {
                    if (element.nameHash.localeCompare(currentLink.sharedFile.nameHash) ===
                        0
                        ? true
                        : false) {
                        owner.ownFiles[index].allowedPeople.push(user._id);
                    }
                });
                owner.save();
                user.save();
                shareLinkSchema_1.default.deleteOne({ _id: currentLink._id }, (err) => {
                    if (err) {
                        throw err;
                    }
                });
            }
        }
    }
    res.redirect(process.env.NODE_ENV
        ? 'http://lenote.herokuapp.com/'
        : 'http://localhost:3000/');
}));
exports.default = router;
//# sourceMappingURL=shareLinkHandler.js.map