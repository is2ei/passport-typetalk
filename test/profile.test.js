const Profile = require("../lib/profile");

describe("Profile#parse", () => {

    describe("try to parse string", () => {
        let profile = {};
        before((done) => {
            profile = Profile.parse('{"account":{"id":12345}}');
            done();
        });

        it("should parse profile", () => {
            const profileId = 12345;
            expect(profile.id).to.equal(profileId);
        });
    });
});
