import MongoStore from 'connect-mongo';
import expressSession from 'express-session';

const middleware = expressSession({
  secret: process?.env?.SESSION_SECRET || '',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 604800000 },
  store: MongoStore.create({
    mongoUrl: process?.env?.MONGODB_URI || '',
  }),
});

export default middleware;
