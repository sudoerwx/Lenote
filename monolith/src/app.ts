import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import db from './models/db';
import bodyParser from 'body-parser';
import './config/passport-setup';
import passport from 'passport';
import winston from 'winston';
// routers
import filesRouter from './routes/files';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import linkRouter from './routes/links';
import imageRouter from './routes/images';
import shareLinkHandler from './routes/shareLinkHandler';
import errorHandler from './controllers/errorHandler';
import sessionMiddleware from './utils/sessionMiddleware';

// winston.createLogger({
//   level: 'warn',
//   format: winston.format.combine(
//     winston.format.timestamp({
//       format: 'YYYY-MM-DD HH:mm:ss',
//     }),
//     winston.format.printf((info) => `[${info.timestamp}] ${info.stack}`)
//   ),
//   transports: [
//     new winston.transports.File({
//       filename: './log/error.log',
//       handleExceptions: true,
//     }),
//   ],
//   exitOnError: false,
// });

db.setUPConnection();

const app = express();
app.use(sessionMiddleware);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(passport.initialize());
app.use(passport.session());

// login handler
app.use('/auth', authRouter);
// work with users
app.use('/user', usersRouter);
// work with files
app.use('/file', filesRouter);
// create links
app.use('/link', linkRouter);
// handle links
app.use('/share', shareLinkHandler);
// handle images and create it
app.use('/img', imageRouter);

app.use(express.static(path.resolve(__dirname, '../../client/build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + '../../client/build/index.html'));
});

// error handler
app.use(errorHandler);

export default app;
