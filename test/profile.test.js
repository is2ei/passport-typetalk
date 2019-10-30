/* eslint-disable func-names */

const Profile = require("../lib/profile"),
    chai = require("chai");

describe("Profile#parse", function () {

    describe("try to parse string", function () {
        let profile = {};
        before(function (done) {
            profile = Profile.parse('{"account":{"id":12345}}');
            done();
        });

        it("should parse profile", function () {
            const profileId = 12345;
            chai.expect(profile.id).to.equal(profileId);
        });
    });
});
