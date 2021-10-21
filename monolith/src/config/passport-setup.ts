import passport from 'passport';
import Google from 'passport-google-oauth20';
import md5 from 'md5';
import User from '../models/Schema/userSchema';
import websockets from '../sockets/websockets';
import { createFile } from '../sockets/websockets';

const GoogleStrategy = Google.Strategy;

type User = {
  _id?: number;
};

// login serializer
passport.serializeUser((user: User, done) => {
  done(null, user._id);
});
// login deserializer
passport.deserializeUser((id, done) => {
  User.findById(id, {}, {}, (err, user) => {
    done(err, user);
  });
});

// google strategy user find or create
passport.use(
  new GoogleStrategy(
    {
      clientID: process?.env?.GOOGLE_CLIENT_ID,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ _id: profile.id }, { __v: 0 }, {}, (err, currentUser) => {
        if (currentUser) {
          done(err, currentUser);
        } else {
          const nameHash = md5('Welcome' + profile.id);
          new User({
            _id: profile.id,
            name: profile.name.givenName,
            secondName: profile.name.familyName,
            email: profile.emails[0].value,
            photoURI: profile.photos[0].value,
            ownFiles: [
              {
                name: 'Welcome',
                nameHash,
                ownerId: profile.id,
                ownerName: profile.name.givenName,
                allowedPeople: [],
              },
            ],
            secondFiles: [],
          })
            .save()
            .then((newUser) => {
              createFile(nameHash, '#Welcome');

              done(err, newUser);
            });
        }
      });
    }
  )
);
