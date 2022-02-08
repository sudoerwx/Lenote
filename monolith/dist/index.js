"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = __importDefault(require("./app"));
const debug = require('debug');
// import socketIO from 'socket.io';
// import collaborationSockets from './sockets/colaboration';
/**
 * Create HTTP server.
 */
const debugInstance = debug('lenote:server');
// const io = socketIO(server, { transports: ['polling'] });
// collaborationSockets(io);
/**
 * Normalize a port into a number, string, or false.
 */
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '5000');
app_1.default.set('port', port);
/**
 * Create Socket.IO server and connect sockets
 */
//Setup WebSockets and add midleware
/**
 * Event listener for HTTP server "error" event.
 */
const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
};
/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = (port) => {
    debugInstance('Listening on ' + port);
};
/**
 * Listen on provided port, on all network interfaces.
 */
app_1.default.listen(port, function () {
    console.log('server is running on port ' + port);
});
app_1.default.on('error', onError);
app_1.default.on('listening', onListening);
//# sourceMappingURL=index.js.map