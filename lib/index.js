// Load modules.
const Strategy = require("./strategy"),
    TypetalkAPIError = require("./errors/typetalkapierror");

// Expose Strategy.
/* eslint-disable-next-line no-multi-assign */
exports = module.exports = Strategy;

// Exports.
exports.Strategy = Strategy;

exports.TypetalkAPIError = TypetalkAPIError;
