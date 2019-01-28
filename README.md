passport-typetalk
===

[![Build Status](https://travis-ci.org/is2ei/passport-typetalk.svg?branch=master)][travis]
[![Coverage Status](https://coveralls.io/repos/github/is2ei/passport-typetalk/badge.svg?branch=master)][coveralls]
[![npm version](https://badge.fury.io/js/passport-typetalk.svg)][npm]

[travis]: https://travis-ci.org/is2ei/passport-typetalk
[coveralls]: https://coveralls.io/github/is2ei/passport-typetalk?branch=master
[npm]: https://badge.fury.io/js/passport-typetalk

[Passport](http://passportjs.org/) strategy for authenticating with [Typetalk](https://www.typetalk.com) using the OAuth 2.0 API.

## Install

```
$ npm install --save-dev passport-typetalk
```

## Usage

Express example

```javascript
const {TYPETALK_CLIENT_ID, TYPETALK_CLIENT_SECRET} = process.env,
      TypetalkStrategy = require('passport-typetalk').Strategy,
      passport = require('passport')
      express = require('express'),
      app = express();

passport.use(new TypetalkStrategy({
    clientID: TYPETALK_CLIENT_ID,
    clientSecret: TYPETALK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/typetalk/callback",
    scope: ['my', 'topic.read']
  }, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/typetalk">Login with Typetalk</a>');
});

app.get('/profile', (req, res) => {
  res.send('<p>ID: '+req.user.id+'</p><p>Name: '+req.user.name+'</p>');
});

app.get('/auth/typetalk',
  passport.authenticate('typetalk'));

app.get('/auth/typetalk/callback',
  passport.authenticate('typetalk', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  });

app.listen(3000);
```
