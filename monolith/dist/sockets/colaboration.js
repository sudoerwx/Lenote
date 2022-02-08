"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sessionMiddleware_1 = __importDefault(require("../utils/sessionMiddleware"));
const collaboration = (io) => {
    //Access passport.js user information from a socket.io connection.
    io.use((socket, next) => {
        (0, sessionMiddleware_1.default)(socket.request, socket.request.res, next);
    });
    let anchors = {};
    let names = {};
    io.on('connection', (client) => {
        const id = client.id;
        let roomName = '';
        client.on('joinRoom', (roomName) => {
            var _a, _b, _c;
            client.join(roomName);
            // @ts-ignore
            anchors = ((_a = client.adapter.rooms[roomName]) === null || _a === void 0 ? void 0 : _a.anchors) || {};
            // @ts-ignore
            names = ((_b = client.adapter.rooms[roomName]) === null || _b === void 0 ? void 0 : _b.names) || {};
            // @ts-ignore
            names[id] = (_c = client.request.user) === null || _c === void 0 ? void 0 : _c.photoURI;
            // @ts-ignore
            anchors[id] = [0, 0];
            io.to(roomName).emit('initialize', { anchors, names });
            io.to(roomName).emit('id-join', {
                id,
                // @ts-ignore
                name: names[id],
                // @ts-ignore
                anchor: anchors[id],
            });
        });
        // send client its id and anchor and names obj
        // client.on('anchor-update', (msg) => {
        //   // set anchors[id]
        //   // @ts-ignore
        //   anchors[id] = msg;
        //   // @ts-ignore
        //   io.to(roomName).emit('anchor-update', { id, anchor: anchors[id] });
        // });
        // Remove id info and update clients
        // TODO: This doesn't seem to always get called
        // Mashing resfresh on a page seems to leave lingering
        // connections that eventually close
        // client.on('disconnect', () => {
        //   // @ts-ignore
        //   delete names[id];
        //   // @ts-ignore
        //   delete anchors[id];
        //   io.to(roomName).emit('id-left', { id });
        // });
    });
};
exports.default = collaboration;
//# sourceMappingURL=colaboration.js.map