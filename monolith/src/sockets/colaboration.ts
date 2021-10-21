import expressSession from 'express-session';
import { mongodb, session } from '../config/keys';
import { authorize } from 'passport.socketio';
import cookieParser from 'cookie-parser';

import MongoStore from 'connect-mongo';
import { Socket } from 'socket.io';

const expressSessionConnect = expressSession({
  secret: process?.env?.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 604800000 },
  store: MongoStore.create({
    mongoUrl: process?.env?.MONGODB_URI || '',
  }),
});

const mongoStore = new expressSessionConnect({
  url: mongodb.dbURI,
});

const collaboration: (io: any) => void = (io) => {
  //Access passport.js user information from a socket.io connection.

  io.use(
    authorize({
      cookieParser: cookieParser, // the same middleware you registrer in express
      secret: session.secret, // the session_secret to parse the cookie
      store: mongoStore, // we NEED to use a sessionstore. no memorystore please
    })
  );

  let anchors = {};
  let names = {};
  io.on('connection', (client: Socket) => {
    const id = client.id;

    let roomName = '';
    client.on('joinRoom', (room) => {
      roomName = room;
      client.join(room);

      anchors = client.adapter.rooms[roomName].anchors
        ? client.adapter.rooms[roomName].anchors
        : (client.adapter.rooms[roomName].anchors = {});
      names = client.adapter.rooms[roomName].names
        ? client.adapter.rooms[roomName].names
        : (client.adapter.rooms[roomName].names = {});

      names[id] = client.request.user.photoURI;
      anchors[id] = [0, 0];
      io.to(roomName).emit('initialize', { anchors, names });
      io.to(roomName).emit('id-join', {
        id,
        name: names[id],
        anchor: anchors[id],
      });
    });
    // send client its id and anchor and names obj

    client.on('anchor-update', (msg) => {
      // set anchors[id]
      anchors[id] = msg;
      io.to(roomName).emit('anchor-update', { id, anchor: anchors[id] });
    });

    // Remove id info and update clients
    // TODO: This doesn't seem to always get called
    // Mashing resfresh on a page seems to leave lingering
    // connections that eventually close
    client.on('disconnect', () => {
      delete names[id];
      delete anchors[id];
      io.to(roomName).emit('id-left', { id });
    });
  });
};

export default collaboration;
