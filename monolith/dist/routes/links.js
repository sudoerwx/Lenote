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
const shareLinkSchema_1 = __importDefault(require("../models/Schema/shareLinkSchema"));
const router = express_1.default.Router();
/**
 * create link for sharing in DB and send as answer ro client
 */
router.get('/:nameHash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }
    const fileid = req.user.ownFiles.findIndex((element) => element.nameHash === req.params.nameHash);
    if (fileid === -1) {
        res.sendStatus(204);
        return;
    }
    const currentLink = yield shareLinkSchema_1.default.findOne({ _id: (0, md5_1.default)(req.params.nameHash) }, { __v: 0 });
    if (currentLink) {
        currentLink.createdAt = Date.now();
        currentLink.save();
        res.send({
            status: 'updated',
            link: currentLink._id,
            expires: 86400,
        });
    }
    else {
        new shareLinkSchema_1.default({
            _id: (0, md5_1.default)(req.params.nameHash),
            sharedFile: req.user.ownFiles[fileid],
            createdAt: Date.now(),
        })
            .save()
            .then((newLink) => {
            res.send({
                status: 'created',
                link: newLink._id,
                expires: 86400,
            });
        });
    }
}));
/**
 * delete link in DB and send 200 status
 */
router.delete('/:nameHash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.sendStatus(401);
        return;
    }
    const fileid = req.user.ownFiles.findIndex((element) => element.nameHash === req.params.nameHash);
    if (fileid === -1) {
        res.sendStatus(204);
        return;
    }
    const currentLink = yield shareLinkSchema_1.default.findOne({ _id: (0, md5_1.default)(req.params.nameHash) }, { __v: 0 });
    if (currentLink) {
        shareLinkSchema_1.default.deleteOne({ _id: currentLink._id }, (err) => { }).then(res.sendStatus(200));
    }
}));
exports.default = router;
//# sourceMappingURL=links.js.map