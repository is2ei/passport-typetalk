/* eslint-disable func-names */

const chai = require("chai"),
    strategy = require("..");

describe("passport-typetalk", function () {

    it("should export Strategy constructor as module", function () {
        chai.expect(strategy).to.be.a("function");
        chai.expect(strategy).to.equal(strategy.Strategy);
    });

    it("should export Strategy constructor", function () {
        chai.expect(strategy.Strategy).to.be.a("function");
    });

    it("should export Error constructors", function () {
        chai.expect(strategy.TypetalkAPIError).to.be.a("function");
    });

});
