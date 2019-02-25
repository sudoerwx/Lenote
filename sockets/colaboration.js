const expressSession = require('express-session')
const keys = require('../config/keys')
const passportSocketIo = require('passport.socketio')
const cookieParser = require('cookie-parser')
const mongoStore = new (require('connect-mongo')(expressSession))({
	url: keys.mongodb.dbURI,
})

exports = module.exports = function(io) {
	//Access passport.js user information from a socket.io connection.

	io.use(
		passportSocketIo.authorize({
			cookieParser: cookieParser, // the same middleware you registrer in express
			secret: keys.session.secret, // the session_secret to parse the cookie
			store: mongoStore, // we NEED to use a sessionstore. no memorystore please
		})
	)

	const anchors = {}
	const names = {}
	io.on('connection', client => {
		const id = client.id
		names[id] = String.fromCharCode(Math.floor('A'.charCodeAt(0) + Math.random() * 26))
		anchors[id] = [0, 0]

		// send client its id and anchor and names obj
		client.emit('initialize', { anchors, names })
		console.log('1234444444')

		client.on('anchor-update', msg => {
			// set anchors[id]
			anchors[id] = msg
			io.emit('anchor-update', { id, anchor: anchors[id] })
		})

		io.emit('id-join', { id, name: names[id], anchor: anchors[id] })

		// Remove id info and update clients
		// TODO: This doesn't seem to always get called
		// Mashing resfresh on a page seems to leave lingering
		// connections that eventually close
		client.on('disconnect', () => {
			console.log('left', id)
			delete names[id]
			delete anchors[id]
			io.emit('id-left', { id })
		})
	})
}
