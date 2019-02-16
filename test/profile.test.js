/* eslint-disable func-names */
var Profile = require("../lib/profile");

describe("Profile#parse", function () {

    describe("try to parse string", function () {
        var profile = {};
        before(function (done) {
            profile = Profile.parse('{"account":{"id":12345}}');
            done();
        });

        it("should parse profile", function () {
            var profileId = 12345;
            expect(profile.id).to.equal(profileId);
        });
    });
});
