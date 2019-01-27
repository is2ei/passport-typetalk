// Load modules.
var OAuth2Strategy = require('passport-oauth2')
  , util = require('util');

/**
 * `Strategy` constructor.
 *
 * @constructor
 * @param {object} options 
 * @param {function} verify 
 * @access public
 */
function Strategy(options, verify) {
  options = options || {};

  options.authorizationURL = options.authorizationURL || 'https://typetalk.com/oauth2/authorize';
  options.tokenURL = options.tokenURL || 'https://typetalk.com/oauth2/access_token';
  options.scopeSeparator = ' ';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'typetalk';
  this._clientSecret = options.clientSecret;
}

// Inherit from `OAuth2Strategy`.
util.inherits(Strategy, OAuth2Strategy);

/**
 * Authenticate request by delegating to Typetalk using OAuth 2.0.
 *
 * @param {http.IncomingMessage} req
 * @param {object} options
 * @access protected
 */
Strategy.prototype.authenticate = function(req, options) {
  OAuth2Strategy.prototype.authenticate.call(this, req, options);
}


Strategy.prototype.authorizationParams = function(options) {
  var params = {};

  return params;
}


Strategy.prototype.userProfile = function(accessToken, done) {

}

// Expose constructor.
module.exports = Strategy;
