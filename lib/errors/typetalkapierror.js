/**
 * `TypetalkAPIError` error.
 * 
 * @constructor
 * @param {string} message 
 * @param {string} error 
 * @param {string} error_description 
 * @access public
 */
function TypetalkAPIError(error, error_description) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'TypetalkAPIError';
  this.error = error;
  this.error_description = error_description;
  this.status = 401;
}

/**
 * Inherit from `Error`.
 */
Object.setPrototypeOf(TypetalkAPIError, Error.prototype);

/**
 * Expose constructor.
 */
module.exports = TypetalkAPIError;