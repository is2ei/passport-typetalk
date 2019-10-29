/*
    eslint-disable
    max-lines-per-function,
    max-statements,
    func-names
*/

const TypetalkAPIError = require("../lib/errors/typetalkapierror"),
    TypetalkStrategy = require("../lib/strategy");

describe("Strategy#userProfile", function () {

    describe("fetched from default endpoint", function () {
        const strategy = new TypetalkStrategy({
            "clientID": "ABC123",
            "clientSecret": "secret"
        }, () => {
            // Do nothing.
        });

        let profile = null;
        before(function (done) {
            strategy._oauth2.get = function (url, accessToken, callback) {
                if (url !== "https://typetalk.com/api/v1/profile") {
                    return callback(new Error("incorrect url argument"));
                }
                if (accessToken !== "token") {
                    return callback(new Error("incorrect token argument"));
                }

                const body = '{"account":{"id":12345,"name":"bob",' +
                '"fullName":"Bob Smith","suggestion":"Bob Smith",' +
                '"mailAddress":"bob@example.com",' +
                '"imageUrl":"https://typetalk.com' +
                "/accounts/123456789/profile_image.png" +
                '?t=123456789","lang":"ja-JP","timezoneId":"Asia/Tokyo",' +
                '"createdAt":"2017-09-01T01:55:05Z",' +
                '"updatedAt":"2019-02-02T09:07:47Z"}}';
                callback(null, body);
            };

            strategy.userProfile("token", (e, p) => {
                if (e) {
                    return done(e);
                }
                profile = p;
                done();
            });
        });

        it("should parse profile", function () {
            expect(profile.provider).to.equal("typetalk");
            const profileId = 12345;
            expect(profile.id).to.equal(profileId);
            expect(profile.name).to.equal("bob");
            expect(profile.fullName).to.equal("Bob Smith");
            expect(profile.suggestion).to.equal("Bob Smith");
            expect(profile.mailAddress).to.equal("bob@example.com");
            expect(profile.imageUrl)
                .to
                .equal("https://typetalk.com" +
                "/accounts/123456789/profile_image.png?t=123456789");
            expect(profile.lang).to.equal("ja-JP");
            expect(profile.timezoneId).to.equal("Asia/Tokyo");
            expect(profile.createdAt).to.equal("2017-09-01T01:55:05Z");
            expect(profile.updatedAt).to.equal("2019-02-02T09:07:47Z");
        });
    });

    describe("error caused by invalid token", function () {
        const strategy = new TypetalkStrategy({
            "clientID": "ABC123",
            "clientSecret": "secret"
        }, () => {
            // Do nothing.
        });

        let err = {};
        before(function (done) {
            strategy._oauth2.get = (url, accessToken, callback) => {
                /* eslint-disable max-len */
                const body = '{"error":"invalid_client","error_description":"Invalid client or client is not authorized"}';
                callback({
                    "data": body,
                    "statusCode": 401
                });
            };

            strategy.userProfile("token", (e) => {
                err = e;
                done();
            });
        });

        it("should error", function () {
            expect(err).to.be.an.instanceOf(Error);
            expect(err).to.be.an.instanceOf(TypetalkAPIError);
            expect(err.error).to.equal("invalid_client");
            expect(err.errorDescription)
                .to.equal("Invalid client or client is not authorized");
            const UNAUTHORIZED_RESPONSE_CODE = 401;
            expect(err.status).to.equal(UNAUTHORIZED_RESPONSE_CODE);
        });
    });

    describe("error caused by malformed response", function () {
        const strategy = new TypetalkStrategy({
            "clientID": "ABC123",
            "clientSecret": "secret"
        }, () => {
            // Do nothing.
        });

        let err = {};
        before(function (done) {
            strategy._oauth2.get = (url, accessToken, callback) => {
                const body = "Hello, world!";
                callback(null, body);
            };

            strategy.userProfile("token", (e) => {
                err = e;
                done();
            });
        });

        it("should error", function () {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.message).to.equal("Failed to parse user profile");
        });
    });

    describe("internal error", function () {
        const ERROR_MSG = "something went wrong",
            strategy = new TypetalkStrategy({
                "clientID": "ABC123",
                "clientSecret": "secret"
            }, () => {
                // Do nothing.
            });

        let err = {},
            profile = {};
        before(function (done) {
            strategy._oauth2.get = (a, b, cb) => cb(new Error(ERROR_MSG));

            strategy.userProfile("wrong-token", (e, p) => {
                err = e;
                profile = p;
                done();
            });
        });

        it("should error", function () {
            expect(err).to.be.an.instanceOf(Error);
            expect(err.constructor.name).to.equal("InternalOAuthError");
            expect(err.message).to.equal("Failed to fetch user profile");
            expect(err.oauthError).to.be.an.instanceOf(Error);
            expect(err.oauthError.message).to.equal("something went wrong");
        });

        it("should not load profile", function () {
            /* eslint-disable-next-line no-unused-expressions */
            expect(profile).to.be.undefined;
        });
    });

});
