const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const User = require('./user'); // Adjust the path if necessary

const app = express();

// Session middleware
app.use(session({ 
  secret: 'Harthik',
  resave: false,
  saveUninitialized: false 
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: '795943809248-ieudoo3c4ep3m27mdieh1o1lahtt03a6.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Check if user exists in database
    User.findOne({ googleId: profile.id }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        // If user doesn't exist, create a new one
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value // Assuming the first email is the primary one
        });
        newUser.save(function (err) {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      } else {
        // If user exists, return the user
        return done(null, user);
      }
    });
  }
));

// Serialize and deserialize user
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Routes for Google OAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to homepage
    res.redirect('/');
  });

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
