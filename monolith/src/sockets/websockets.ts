let anchors = {};
let names = {};

const websockets = (ws: any, req: any): void => {
     // @ts-ignore
    const user = req.user;
    const id = user.id;

  const emit = (type: string, data: any) => ws.emit({ type, data,id });

  ws.on('message', (msg: any) => {
    const jsonMsg = JSON.parse(msg);
    const { type, data } = jsonMsg;

 
    console.log('message', { type, data });

    switch (type) {
      case 'join-room':
        // // client.join(roomName);
        // // @ts-ignore
        // anchors = client.adapter.rooms[roomName]?.anchors || {};
        // // @ts-ignore
        // names = client.adapter.rooms[roomName]?.names || {};
        // @ts-ignore
        names[id] = user?.photoURI;
        // @ts-ignore
        anchors[id] = [0, 0];

        emit('initialize', { anchors, names });
        emit('id-join', {
          id,
          // @ts-ignore
          name: names[id],
          // @ts-ignore
          anchor: anchors[id],
        });
        // io.to(roomName).emit('initialize', { anchors, names });
        // io.to(roomName).emit('id-join', {
        //   id,
        //   // @ts-ignore
        //   name: names[id],
        //   // @ts-ignore
        //   anchor: anchors[id],
        // });
        break;

      case 'anchor-update':
        // set anchors[id]
        // @ts-ignore
        anchors[id] = data;
        // @ts-ignore
        // io.to(roomName).emit('anchor-update', { id, anchor: anchors[id] });
        emit('anchor-update', { id, anchor: anchors[id] });

        break;
    }
  });

  ws.on('disconnect', () => {
    // @ts-ignore
    delete names[id];
    // @ts-ignore
    delete anchors[id];
  });
};

export default websockets;
