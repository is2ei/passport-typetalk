var IntermediateInheritor = function IntermediateInheritor () {
    // Do nothing.
};

/**
 * `TypetalkAPIError` error.
 *
 * @constructor
 * @param {string} error
 * @param {string} errorDescription
 * @access public
 */
function TypetalkAPIError (error, errorDescription) {

    Error.call(this);
    Error.captureStackTrace(this, TypetalkAPIError);
    this.name = "TypetalkAPIError";
    this.error = error;
    this.errorDescription = errorDescription;
    this.status = 401;
}

/**
 * Inherit from `Error`.
 */
IntermediateInheritor.prototype = Error.prototype;
TypetalkAPIError.prototype = new IntermediateInheritor();

/**
 * Expose constructor.
 */
module.exports = TypetalkAPIError;
