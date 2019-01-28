const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const md5 = require('md5');
const User = require('../database/Schema/userSchema.js');

const keys = require('./keys');
const path = process.cwd();
const fs = require('fs');
const fse = require('fs-extra');

// login serializer
passport.serializeUser((user, done) => {
  done(null, user);
});
// login deserializer
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
// google strategy user find or create
passport.use(
    new GoogleStrategy(
        {
          clientID: keys.google.clientID,
          clientSecret: keys.google.clientSecret,
          callbackURL: '/auth/google/callback',
        },
        function(accessToken, refreshToken, profile, done) {
          User.findOne(
              {_id: profile.id},
              {__v: 0},
              (err, currentUser) => {
                if (currentUser) {
                  console.log('user is:', currentUser);
                  done(err, currentUser);
                } else {
                  new User({
                    _id: profile.id,
                    name: profile.name.givenName,
                    secondName: profile.name.familyName,
                    email: profile.emails[0].value,
                    photoURI: profile.photos[0].value,
                    ownFiles: [
                      {
                        name: 'Welcome',
                        nameHash: md5('Welcome'),
                        ownerId: profile.id,
                        ownerName: profile.name.givenName,
                      },
                    ],
                    secondFiles: [],
                  })
                      .save()
                      .then((newUser) => {
                        fse.ensureDir(
                            `${path}/userfiles/${newUser._id}/`,
                            (err) => {
                              console.log(err); // => null
                              // dir has now been created
                            }
                        );

                        fs.writeFile(
                            `${path}/userfiles/${newUser._id}/${md5(
                                'Welcome'
                            )}.md`,
                            '#Welcome',
                            function(err) {
                              if (err) console.log(err);
                            }
                        );

                        console.log('new user created' + newUser);
                        done(err, newUser);
                      });
                }
              }
          );
        }
    )
);
