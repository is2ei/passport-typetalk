/*
    eslint-disable
    func-names,
    max-lines-per-function,
    max-len
*/
var chai = require("chai");
var TypetalkStrategy = require("../lib/strategy");


describe("TypetalkStrategy", function () {

    var ERR_MSG = "",
        url = "";

    describe("constructed", function () {

        describe("with normal options", function () {
            var strategyWithNormalOptions = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, function () {
                // Do nothing.
            });

            it("should be named typetalk", function () {
                expect(strategyWithNormalOptions.name).to.equal("typetalk");
            });
        });

        describe("without a clientID option", function () {
            ERR_MSG = "OAuth2Strategy requires a clientID option";
            it("should throw", function () {
                expect(function () {
                    var strategy = new TypetalkStrategy({
                        "clientSecret": "secret"
                    }, function () {
                        // Do nothing.
                    });
                    chai.passport.use(strategy)
                        .redirect(function (u) {
                            url = u;
                        })
                        .req(function () {
                            // Do nothing.
                        })
                        .authenticate();
                })
                    .to
                    .throw(TypeError, ERR_MSG);
            });
        });

        describe("without a clientSecret option", function () {
            it("should not throw", function () {
                expect(function () {
                    var strategy = new TypetalkStrategy({
                        "clientID": "ABC123"
                    }, function () {
                        // Do nothing.
                    });
                    chai.passport.use(strategy)
                        .redirect(function (u) {
                            url = u;
                        })
                        .req(function () {
                            // Do nothing.
                        })
                        .authenticate();
                }).to.not.throw();
            });
        });

    });

    describe("issuing authorization request", function () {

        describe("that redirects to service provider without redirect URI", function () {
            var strategyWithoutCallback = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, function () {
                // Do nothing.
            });

            before(function (done) {
                chai.passport.use(strategyWithoutCallback)
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
                expect(url).to.equal("https://typetalk.com/oauth2/authorize?response_type=code&scope=my&client_id=ABC123");
            });
        });

        describe("that redirects to service provider with redirect URI", function () {
            var strategyWithCallBack = new TypetalkStrategy({
                "callbackURL": "http://example.com/auth/typetalk/callback",
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, function () {
                // Do nothing.
            });

            before(function (done) {
                chai.passport.use(strategyWithCallBack)
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
                expect(url).to.equal("https://typetalk.com/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Fexample.com%2Fauth%2Ftypetalk%2Fcallback&scope=my&client_id=ABC123");
            });
        });

        describe("that redirects to service provider with redirect URI and scope", function () {
            var strategyWithScope = new TypetalkStrategy({
                "callbackURL": "http://example.com/auth/typetalk/callback",
                "clientID": "ABC123",
                "clientSecret": "secret",
                "scope": "my topic.read"
            }, function () {
                // Do nothing.
            });

            before(function (done) {
                chai.passport.use(strategyWithScope)
                    .redirect(function (u) {
                        url = u;
                        done();
                    })
                    .req(function () {
                        // Do nothiung.
                    })
                    .authenticate();
            });

            it("should be redirected", function () {
                expect(url).to.equal("https://typetalk.com/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Fexample.com%2Fauth%2Ftypetalk%2Fcallback&scope=my%20topic.read&client_id=ABC123");
            });
        });

    });

});
