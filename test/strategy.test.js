/* eslint-disable func-names, max-lines-per-function */
var chai = require("chai");
var TypetalkStrategy = require("../lib/strategy");


describe("Strategy", function () {
    var strategy = {},
        url = "";

    describe("constructed", function () {
        strategy = new TypetalkStrategy({
            "clientID": "ABC123",
            "clientSecret": "secret"
        }, function () {
            // Do nothing.
        });

        it("should be named typetalk", function () {
            expect(strategy.name).to.equal("typetalk");
        });
    });

    describe("constructed without options", function () {
        it("should throw", function () {

            expect(function () {
                strategy = new TypetalkStrategy(null, function () {
                    // Do nothing.
                });
                strategy();
            }).to.throw(Error);
        });
    });

    describe("constructed with undefined options", function () {
        it("should throw", function () {
            expect(function () {
                strategy = new TypetalkStrategy({}, function () {
                    // Do nothing.
                });
                strategy();
            }).to.throw(Error);
        });
    });

    describe("auth request with callbackURL and scope parameters", function () {
        strategy = new TypetalkStrategy({
            "callbackURL": "http://localhost:3000/auth/typetalk/callback",
            "clientID": "ABC123",
            "clientSecret": "secret",
            "scope": [
                "my",
                "topic.read"
            ]
        }, function () {
            // Do nothing.
        });

        before(function (done) {
            chai.passport.use(strategy)
                .redirect(function (u) {
                    url = u;
                    done();
                })
                .req(function () {
                    // Do nothing.
                })
                .authenticate();
        });

        it("should be redirected", function () {
            expect(url).to.equal("https://typetalk.com/oauth2/authorize?" +
            "response_type=code&" +
            "redirect_uri=http%3A%2F%2Flocalhost" +
            "%3A3000%2Fauth%2Ftypetalk%2Fcallback&" +
            "scope=my%20topic.read&client_id=ABC123");
        });
    });

});
