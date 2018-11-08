const expressSession = require('express-session');
const keys = require('../config/keys');
const passportSocketIo = require("passport.socketio");
const cookieParser = require('cookie-parser');
const mongoStore = new (require('connect-mongo')(expressSession))({
      url: keys.mongodb.dbURI
    });
exports = module.exports = function(io) {

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,     // the same middleware you registrer in express     
  secret:       keys.session.secret,    // the session_secret to parse the cookie
  store:        mongoStore       // we NEED to use a sessionstore. no memorystore please   
}));

  io.on('connection', function(socket) {
    console.log('a user connected', socket.request.user.name);

    socket.on('patchText', function(patch) {
      // send patch to another users
     // socket.broadcast.emit('user connected');
      // patching file
    });
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
};
