/*
    eslint-disable
    func-names,
    max-lines-per-function,
    max-len
*/
const chai = require("chai");
const TypetalkStrategy = require("../lib/strategy");


describe("TypetalkStrategy", function () {

    describe("constructed", function () {

        describe("with normal options", function () {
            const strategy = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, function () {
                // Do nothing.
            });

            it("should be named typetalk", function () {
                expect(strategy.name).to.equal("typetalk");
            });
        });

        describe("without a clientID option", function () {
            it("should throw", function () {
                expect(function () {
                    const strategy = new TypetalkStrategy({
                        "clientSecret": "secret"
                    }, function () {
                        // Do nothing.
                    });
                    chai.passport.use(strategy)
                        .redirect(function () {
                            // Do nothing.
                        })
                        .req(function () {
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
                expect(function () {
                    const strategy = new TypetalkStrategy({
                        "clientID": "ABC123"
                    }, function () {
                        // Do nothing.
                    });
                    chai.passport.use(strategy)
                        .redirect(function () {
                            // Do nothing.
                        })
                        .req(function () {
                            // Do nothing.
                        })
                        .authenticate();
                }).to.not.throw();
            });
        });

        describe("with null option", function () {
            it("should throw", function () {
                expect(function () {
                    const strategy = new TypetalkStrategy(null, function () {
                        // Do nothiung.
                    });
                    chai.passport.use(strategy)
                        .redirect(function () {
                            // Do nothing.
                        })
                        .req(function () {
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
                expect(function () {
                    const strategy = new TypetalkStrategy({
                        "clientID": "ABC123",
                        "clientSecret": "secret"
                    });
                    chai.passport.use(strategy)
                        .redirect(function () {
                            // Do nothing.
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
            const strategy = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, function () {
                // Do nothing.
            });

            let url = "";
            before(function () {
                chai.passport.use(strategy)
                    .redirect(function (u) {
                        url = u;
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
            const strategy = new TypetalkStrategy({
                "callbackURL": "http://example.com/auth/typetalk/callback",
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, function () {
                // Do nothing.
            });

            let url = "";
            before(function () {
                chai.passport.use(strategy)
                    .redirect(function (u) {
                        url = u;
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
            const strategy = new TypetalkStrategy({
                "callbackURL": "http://example.com/auth/typetalk/callback",
                "clientID": "ABC123",
                "clientSecret": "secret",
                "scope": "my topic.read"
            }, function () {
                // Do nothing.
            });

            let url = "";
            before(function (done) {
                chai.passport.use(strategy)
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
