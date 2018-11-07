const expressSession = require('express-session');
const keys = require('../config/keys');

exports = module.exports = function(io) {
  const sessionMiddleware = expressSession({
    secret: keys.session.cookieKey,
    store: new (require('connect-mongo')(expressSession))({
      url: keys.mongodb.dbURI,
    }),
  });

  io.use(function(socket, next) {
    // Wrap the express middleware
    sessionMiddleware(socket.request, {}, next);
  });

  io.on('connection', function(socket) {
    console.log('a user connected', socket.request.user);

    socket.on('patchText', function(patch) {
      // send patch to another users
      socket.broadcast.emit('user connected');
      // patching file
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
};
