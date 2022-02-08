"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSchema_1 = __importDefault(require("../models/Schema/userSchema"));
const userStatistics_1 = __importDefault(require("../controllers/userStatistics"));
const router = express_1.default.Router();
/**
 * find user data in DB and send as answer
 */
router.get('/', function (req, res) {
    if (req.user) {
        res.send(req.user);
    }
    else {
        res.sendStatus(401);
    }
});
/**
 * delete user and send 200 status
 */
router.delete('/', function (req, res) {
    if (req.user) {
        userSchema_1.default.deleteOne({ _id: req.user._id }, (err) => res.sendStatus(500));
        res.sendStatus(200);
    }
    else {
        res.sendStatus(401);
    }
});
router.get('/statistics', userStatistics_1.default);
exports.default = router;
//# sourceMappingURL=users.js.map