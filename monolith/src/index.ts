/**
 * Module dependencies.
 */

import http from 'http';
import app from './app';
const debug = require('debug');
import socketIO from 'socket.io';
import collaborationSockets from './sockets/colaboration';
import websockets from './sockets/websockets';

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

websockets(server);

const debugInstance = debug('lenote:server');

const io = socketIO(server, { transports: ['polling'] });
collaborationSockets(io);

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: string) => {
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
app.set('port', port);

/**
 * Create Socket.IO server and connect sockets
 */
//Setup WebSockets and add midleware

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error: any) => {
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

const onListening = () => {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr?.port;
	debugInstance('Listening on ' + bind);
};

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
