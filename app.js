const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const db = require('./database/db')
const bodyParser = require('body-parser')
const passportSetup = require('./config/passport-setup')
const passport = require('passport')
const expressSession = require('express-session')
const keys = require('./config/keys')

var http = require('http')
const ShareDB = require('sharedb')
var otText = require('ot-text')
ShareDB.types.register(otText.type)
const wsdb = require('sharedb-mongo')(keys.mongodb.dbURI)

const share = new ShareDB({ db: wsdb })

const shareconn = share.connect()

const WebSocket = require('ws')
const WebSocketJSONStream = require('websocket-json-stream')

const shareserver = http.createServer()
const sharewss = new WebSocket.Server({ server: shareserver })
sharewss.on('connection', client => share.listen(new WebSocketJSONStream(client)))
shareserver.listen(4000)
console.log(`ShareDB listening on port 4000`)

// routers
const filesRouter = require('./routes/files')
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')

db.setUPConnection()

const app = express()
app.use(
	expressSession({
		secret: keys.session.secret,
		store: new (require('connect-mongo')(expressSession))({
			url: keys.mongodb.dbURI,
		}),
	})
)

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.text())
app.use(passport.initialize())
app.use(passport.session())

app.use('/file/create/:name', (res, req, next) => {
	// Create the document if it hasn't been already
	//  const sharedoc = shareconn.get('docs', 'Welcome')
	// if (sharedoc.data == null) sharedoc.create("", 'ot-text');

	var doc = shareconn.get('docs', req.param.name)
	doc.fetch(function(err) {
		if (err) throw err
		if (doc.type === null) {
			doc.create('', 'text')
		}
	})

	next()
})

app.use('/auth', authRouter)
// work with users
app.use('/users', usersRouter)
// work with files
app.use('/files', filesRouter)
// login handler

/*
    app.use(express.static(path.resolve(__dirname, './ClientApp/build')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/ClientApp/build/index.html'))
})
    */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.send(err.message)
})

module.exports = app
