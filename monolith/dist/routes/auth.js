"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const router = express_1.default.Router();
/**
 * google login handler and redirect to google OAuth2
 */
router.get('/google', auth_1.googleLogin);
/**
 * google login callback and redirect to home page
 */
router.get('/google/callback', auth_1.googleCallback);
/**
 * google logout handler and redirect to home page
 */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect(process.env.NODE_ENV ? '/' : 'http://localhost:3000/');
});
exports.default = router;
//# sourceMappingURL=auth.js.map