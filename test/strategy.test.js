/*
    eslint-disable
    max-lines-per-function,
    max-len,
    func-names
*/
const TypetalkStrategy = require("../lib/strategy"),
    chai = require("chai");

describe("TypetalkStrategy", function () {
    describe("constructed", function () {
        describe("with normal options", function () {
            const strategy = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, () => {
                // Do nothing.
            });

            it("should be named typetalk", function () {
                expect(strategy.name).to.equal("typetalk");
            });
        });

        describe("without a clientID option", function () {
            it("should throw", function () {
                expect(() => {
                    const strategy = new TypetalkStrategy({
                        "clientSecret": "secret"
                    }, () => {
                        // Do nothing.
                    });
                    chai.passport.use(strategy)
                        .redirect(() => {
                            // Do nothing.
                        })
                        .req(() => {
                            // Do nothing.
                        })
                        .authenticate();
                })
                    .to
                    .throw(TypeError, "OAuth2Strategy requires a clientID option");
            });
        });

        describe("without a clientSecret option", function () {
            it("should not throw", function () {
                expect(() => {
                    const strategy = new TypetalkStrategy({
                        "clientID": "ABC123"
                    }, () => {
                        // Do nothing.
                    });
                    chai.passport.use(strategy)
                        .redirect(() => {
                            // Do nothing.
                        })
                        .req(() => {
                            // Do nothing.
                        })
                        .authenticate();
                }).to.not.throw();
            });
        });

        describe("with null option", function () {
            it("should throw", function () {
                expect(() => {
                    const strategy = new TypetalkStrategy(null, () => {
                        // Do nothiung.
                    });
                    chai.passport.use(strategy)
                        .redirect(() => {
                            // Do nothing.
                        })
                        .req(() => {
                            // Do nothiung.
                        })
                        .authenticate();
                })
                    .to
                    .throw(TypeError, "OAuth2Strategy requires a clientID option");
            });
        });

        describe("without verify", function () {
            it("should not throw", function () {
                expect(() => {
                    const strategy = new TypetalkStrategy({
                        "clientID": "ABC123",
                        "clientSecret": "secret"
                    });
                    chai.passport.use(strategy)
                        .redirect(() => {
                            // Do nothing.
                        })
                        .req(() => {
                            // Do nothing.
                        })
                        .authenticate();
                }).to.not.throw();
            });
        });

    });

    describe("issuing authorization request", function () {
        describe("that redirects to service provider without redirect URI", function () {
            const strategy = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, () => {
                // Do nothing.
            });

            let url = "";
            before(function () {
                chai.passport.use(strategy)
                    .redirect((u) => {
                        url = u;
                    })
                    .req(() => {
                        // Do nothing.
                    })
                    .authenticate();
            });

            it("should be redirected", function () {
                expect(url).to.equal("https://typetalk.com/oauth2/authorize?response_type=code&scope=my&client_id=ABC123");
            });
        });

        describe("that redirects to service provider with redirect URI", function () {
            const strategy = new TypetalkStrategy({
                "callbackURL": "http://example.com/auth/typetalk/callback",
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, () => {
                // Do nothing.
            });

            let url = "";
            before(function () {
                chai.passport.use(strategy)
                    .redirect((u) => {
                        url = u;
                    })
                    .req(() => {
                        // Do nothing.
                    })
                    .authenticate();
            });

            it("should be redirected", function () {
                expect(url).to.equal("https://typetalk.com/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Fexample.com%2Fauth%2Ftypetalk%2Fcallback&scope=my&client_id=ABC123");
            });
        });

        describe("that redirects to service provider with redirect URI and scope", function () {
            const strategy = new TypetalkStrategy({
                "callbackURL": "http://example.com/auth/typetalk/callback",
                "clientID": "ABC123",
                "clientSecret": "secret",
                "scope": "my topic.read"
            }, () => {
                // Do nothing.
            });

            let url = "";
            before(function (done) {
                chai.passport.use(strategy)
                    .redirect((u) => {
                        url = u;
                        done();
                    })
                    .req(() => {
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
