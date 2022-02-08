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
const ImageSchema_1 = __importDefault(require("../models/Schema/ImageSchema"));
const multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
/**
 * send as answer Image
 */
router.get('/:Hash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentImage = yield ImageSchema_1.default.findOne({ _id: req.params.Hash }, { __v: 0 });
    if (!currentImage) {
        res.sendStatus(204);
        return;
    }
    currentImage.createdAt = Date.now();
    currentImage.save();
    res.contentType(currentImage.img.contentType);
    res.send(currentImage.img.data);
}));
/**
 * create Image for sharing in DB and send as answer slug
 */
router.post('/', upload.single('file'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.sendStatus(401);
    }
    const currentImage = yield ImageSchema_1.default.findOne({ _id: req.params.Hash }, { __v: 0 });
    if (currentImage) {
        res.send(currentImage._id);
    }
    else {
        new ImageSchema_1.default({
            _id: (0, md5_1.default)(Date.now().toString() + req.user._id),
            img: { data: req.file.buffer, contentType: req.file.mimetype },
            createdAt: Date.now(),
        })
            .save()
            .then((newImage) => {
            res.send(newImage._id);
        });
    }
}));
exports.default = router;
//# sourceMappingURL=images.js.map