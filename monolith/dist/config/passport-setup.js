"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const md5_1 = __importDefault(require("md5"));
const userSchema_1 = __importDefault(require("../models/Schema/userSchema"));
const sharedbWs_1 = require("../sockets/sharedbWs");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
// type User = {
//   _id?: number;
// };
// login serializer
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
// login deserializer
passport_1.default.deserializeUser((id, done) => {
    userSchema_1.default.findById(id, {}, {}, (err, user) => {
        done(err, user);
    });
});
// google strategy user find or create
passport_1.default.use(new GoogleStrategy({
    clientID: (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.GOOGLE_CLIENT_ID,
    clientSecret: (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, function (accessToken, refreshToken, profile, done) {
    userSchema_1.default.findOne({ _id: profile.id }, { __v: 0 }, {}, (err, currentUser) => {
        if (currentUser) {
            done(err, currentUser);
        }
        else {
            const nameHash = (0, md5_1.default)('Welcome' + profile.id);
            new userSchema_1.default({
                _id: profile.id,
                name: profile.name.givenName,
                secondName: profile.name.familyName,
                email: profile.emails[0].value,
                photoURI: profile.photos[0].value,
                ownFiles: [
                    {
                        name: 'Welcome',
                        nameHash,
                        ownerId: profile.id,
                        ownerName: profile.name.givenName,
                        allowedPeople: [],
                    },
                ],
                secondFiles: [],
            })
                .save()
                .then((newUser) => {
                (0, sharedbWs_1.createFile)(nameHash, '#Welcome');
                done(err, newUser);
            });
        }
    });
}));
//# sourceMappingURL=passport-setup.js.map