// @ts-ignore
import { type } from 'ot-text';
import ShareDB, { types } from 'sharedb';
// @ts-ignore
import shareDb from 'sharedb-mongo';
import WebSocketJSONStream from '@soundation/websocket-json-stream';

const wsdb = shareDb(process?.env?.MONGODB_URI);

const share = new ShareDB({ db: wsdb });

const shareConn = share.connect();

types.register(type);

const sharedbWs = (shareWss: any): void => {
  const stream = new WebSocketJSONStream(shareWss);

  share.listen(stream);
};

export const createFile: (name: string, data?: any) => void = (name, data) => {
  var doc = shareConn.get('docs', name);
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      // @ts-ignore
      doc.create(data || '#Hello', 'text');
    }
  });
};

export const deleteFile: (name: string) => void = (name) => {
  var doc = shareConn.get('docs', name);
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type !== null) {
      doc.del({}, (err) => {
        if (err) throw err;
      });
    }
  });
};

export default sharedbWs;
