passport-typetalk
===

[![Build Status](https://travis-ci.org/is2ei/passport-typetalk.svg?branch=master)][travis]
[![npm version](https://badge.fury.io/js/passport-typetalk.svg)][npm]

[travis]: https://travis-ci.org/is2ei/passport-typetalk
[npm]: https://badge.fury.io/js/passport-typetalk

[Passport](http://passportjs.org/) strategy for authenticating with [Typetalk](https://www.typetalk.com) using the OAuth 2.0 API.

## Install

```
$ npm install --save-dev passport-typetalk
```

## Usage

Express example

```
const {TYPETALK_CLIENT_ID, TYPETALK_CLIENT_SECRET} = process.env;
const Express = require('express');
const TypetalkStrategy = require('passport-typetalk').Strategy
const passport = require('passport');

const app = Express();

passport.use(new TypetalkStrategy({
    clientID: TYPETALK_CLIENT_ID,
    clientSecret: TYPETALK_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/typetalk/callback",
    scope: ['my', 'topic.read']
  }, (accessToken, refreshToken, profile, done) => {
    // optionally persist profile data
    done(null, profile);
  }
));

app.use(passport.initialize());

app.get('/', function(req, res) {
  res.send('<a href="/auth/typetalk">Login with Typetalk</a>')
})

app.get('/auth/typetalk', passport.authorize('typetalk'));

app.get('/auth/typetalk/callback',
  passport.authorize('typetalk', { failureRedirect: '/' }),
  (req, res) => res.redirect('/')
);

app.listen(3000);
```
