"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rooms = {};
const websockets = (ws, req) => {
    const file = req.params.file;
    // @ts-ignore
    const user = req.user;
    const id = user.id;
    const leave = () => {
        var _a;
        console.log("delete", rooms);
        // not present: do nothing
        if (!((_a = rooms[file]) === null || _a === void 0 ? void 0 : _a[id]))
            return;
        // if the one exiting is the last one, destroy the room
        if (Object.keys(rooms[file]).length === 3)
            delete rooms[file];
        else {
            delete rooms[file][id];
            delete rooms[file].anchors[id];
            delete rooms[file].names[id];
        }
        emit('id-left', { id });
    };
    if (!rooms[file])
        rooms[file] = { anchors: {}, names: {} }; // create the room
    if (!rooms[file][id])
        rooms[file][id] = ws; // join the room
    console.log('join', file);
    rooms[file].names[id] = user === null || user === void 0 ? void 0 : user.photoURI;
    // @ts-ignore
    rooms[file].anchors[id] = [0, 0];
    const emit = (type, data) => {
        var _a;
        return Object.entries((_a = rooms[file]) !== null && _a !== void 0 ? _a : {}).filter(([key]) => key !== "anchors" && key !== 'names').forEach(([key, sock]) => {
            console.log("sent ", file, type);
            sock.send(JSON.stringify({ type, data, id: key }));
        });
    };
    emit('initialize', { anchors: rooms[file].anchors, names: rooms[file].names });
    //   emit('id-join', {
    //     id,
    //     // @ts-ignore
    //     name: rooms[file].names[id],
    //     // @ts-ignore
    //     anchor: rooms[file].anchors[id],
    //   });
    ws.on('message', (msg) => {
        const jsonMsg = JSON.parse(msg);
        const { type, data, room } = jsonMsg;
        console.log('message', { type });
        switch (type) {
            case 'anchor-update':
                // set anchors[id]
                // @ts-ignore
                rooms[file].anchors[id] = data;
                // @ts-ignore
                // io.to(roomName).emit('anchor-update', { id, anchor: anchors[id] });
                emit('anchor-update', { id, anchor: rooms[file].anchors[id] });
                break;
        }
    });
    ws.on('close', () => {
        console.log("disconnect");
        leave();
    });
};
exports.default = websockets;
//# sourceMappingURL=websockets.js.map