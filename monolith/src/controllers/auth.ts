import passport from 'passport';

export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

export const googleCallback = passport.authenticate('google', {
  successRedirect: process.env.NODE_ENV ? '/' : 'http://localhost:3000/',
  failureRedirect: '/auth/google',
});
