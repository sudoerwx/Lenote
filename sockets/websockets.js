var http = require("http");
const ShareDB = require("sharedb");
const keys = require("../config/keys");
var otText = require("ot-text");
ShareDB.types.register(otText.type);
const wsdb = require("sharedb-mongo")(keys.mongodb.dbURI);

const share = new ShareDB({ db: wsdb });

const shareconn = share.connect();

const WebSocket = require("ws");
const WebSocketJSONStream = require("websocket-json-stream");


exports = module.exports = (shareserver)=> {
  const sharewss = new WebSocket.Server({ server: shareserver });
sharewss.on("connection", client =>
  share.listen(new WebSocketJSONStream(client))
);
};

exports.createFile = function(name, data) {
  var doc = shareconn.get("docs", name);
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type === null) {
      doc.create(data || "#Hello", "text");
    }
  });
};

exports.deleteFile = function(name) {
  var doc = shareconn.get("docs", name);
  doc.fetch(function(err) {
    if (err) throw err;
    if (doc.type !== null) {
      doc.del(function(err) {
        if (err) throw err;
      });
    }
  });
};
