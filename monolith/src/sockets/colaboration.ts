import expressSession from 'express-session';
import { authorize } from 'passport.socketio';
import cookieParser from 'cookie-parser';
import sessionMiddleware from '../utils/sessionMiddleware';
import MongoStore from 'connect-mongo';
import { Socket } from 'socket.io';

const collaboration: (io: any) => void = (io) => {
  //Access passport.js user information from a socket.io connection.

  io.use((socket: Socket, next: () => void) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });

  let anchors = {};
  let names = {};
  io.on('connection', (client: Socket) => {
    const id = client.id;

    let roomName = '';
    client.on('joinRoom', (roomName) => {
      client.join(roomName);
      // @ts-ignore
      anchors = client.adapter.rooms[roomName]?.anchors || {};
      // @ts-ignore
      names = client.adapter.rooms[roomName]?.names || {};
      // @ts-ignore
      names[id] = client.request.user?.photoURI;
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

export default collaboration;
