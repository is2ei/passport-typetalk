passport-typetalk
===

[![Build Status](https://img.shields.io/travis/is2ei/passport-typetalk/master.svg?style=flat-square)][travis]
[![Coverage Status](https://img.shields.io/coveralls/github/is2ei/passport-typetalk.svg?style=flat-square)][coveralls]
[![npm version](https://img.shields.io/npm/v/passport-typetalk.svg?style=flat-square)][npm]
[![chat on gitter](https://img.shields.io/gitter/room/is2ei/passport-typetalk.svg?style=flat-square)][gitter]

[travis]: https://travis-ci.com/is2ei/passport-typetalk
[coveralls]: https://coveralls.io/github/is2ei/passport-typetalk?branch=master
[npm]: https://badge.fury.io/js/passport-typetalk
[gitter]: https://gitter.im/is2ei/passport-typetalk

[Passport](http://passportjs.org/) strategy for authenticating with [Typetalk](https://www.typetalk.com) using the OAuth 2.0 API.

## Install

```
$ npm install passport-typetalk
```

## Usage

Express example

```javascript
const TypetalkStrategy = require("passport-typetalk").Strategy,
    config = require("./config"),
    express = require("express"),
    passport = require("passport");

const PORT = 3000,
    app = express();

passport.use(new TypetalkStrategy({
    "callbackURL": "http://localhost:3000/auth/typetalk/callback",
    "clientID": config.clientID,
    "clientSecret": config.clientSecret,
    "scope": [
        "my",
        "topic.read"
    ]
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({"extended": true}));
app.use(require("express-session")({
    "resave": true,
    "saveUninitialized": true,
    "secret": "keyboard cat"
}));

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send('<a href="/auth/typetalk">Login with Typetalk</a>');
});

app.get("/profile", (req, res) => {
    res.send(`<p>ID: ${req.user.id}</p><p>Name: ${req.user.name}</p>`);
});

app.get(
    "/auth/typetalk",
    passport.authenticate("typetalk")
);

app.get(
    "/auth/typetalk/callback",
    passport.authenticate("typetalk", {"failureRedirect": "/"}),
    (req, res) => {
        res.redirect("/profile");
    }
);

app.listen(PORT);
```

For working example, see [this repository](https://github.com/is2ei/passport-typetalk-example)

## API Documents

[Here](https://is2ei.github.io/passport-typetalk/index.html).
