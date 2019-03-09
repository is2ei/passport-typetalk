const strategy = require("..");

describe("passport-typetalk", () => {

    it("should export Strategy constructor as module", () => {
        expect(strategy).to.be.a("function");
        expect(strategy).to.equal(strategy.Strategy);
    });

    it("should export Strategy constructor", () => {
        expect(strategy.Strategy).to.be.a("function");
    });

    it("should export Error constructors", () => {
        expect(strategy.TypetalkAPIError).to.be.a("function");
    });

});
