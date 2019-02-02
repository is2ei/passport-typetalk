// Load modules.
var OAuth2Strategy = require('passport-oauth2');
var Profile = require('./profile');
var util = require('util');
var uri = require('url');
var InternalOAuthError = require('passport-oauth2').InternalOAuthError;
var TypetalkAPIError = require('./errors/typetalkapierror');

/**
 * `Strategy` constructor.
 *
 * The Typetalk authentication strategy authenticates requests by delegating to
 * Typetalk using the OAuth 2.0 protocol.
 *
 * Options:
 *    - `clientID`     your Typetalk application's client ID
 *    - `clientSecret` your Typetalk application's client secret
 *    - `callbackURL`  URL to which Typetalk will redirect the user after granting authorization
 *    - `scope`        Permission scopes
 *
 * Examples:
 *
 *    passport.use(new TypetalkStrategy({
 *        clientID: '123-456-789'
 *        clientSecret: 'shhh-its-a-secret'
 *        callbackURL: 'https://www.example.net/auth/typetalk/callback',
 *        scope: ['my', 'topic.read']
 *      },
 *      function(accessToken, refreshToken, profile, cb) {
 *        User.findOrCreate(..., function (err, user) {
 *          cb(err, user);
 *      }
 *    ));
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
  options.scope = options.scope || ['my'];
  options.scopeSeparator = options.scopeSeparator || ' ';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'typetalk';
  this._profileURL = options.profileURL || 'https://typetalk.com/api/v1/profile';
  this._clientSecret = options.clientSecret;
}

/**
 * Inherit from `OAuth2Strategy`.
 */
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
};

/**
 * Retrieve user profile from Typetalk
 *
 * This function constructs a normalized profile, with the following properties:
 * 
 *   - `provider` always set to `typetalk`
 *   - `id`       the user's Typetalk ID
 *
 * @param {string} accessToken
 * @param {function} done
 * @access protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  var url = uri.parse(this._profileURL);
  url = uri.format(url);

  this._oauth2.get(url, accessToken, function(err, body, res) {
    var json;

    if (err) {
      if (err.data) {
        try {
          json = JSON.parse(err.data);
        } catch (_) {}
      }

      if (json && json.error && typeof json.error === 'string') {
        return done(new TypetalkAPIError(error.error, error_description));
      }
      return done(new InternalOAuthError('Failed to fetch user profile', err));
    }

    try {
      json = JSON.parse(body);
    } catch (ex) {
      return done(new Error('Failed to parse user profile'));
    }

    var profile = Profile.parse(json);
    profile.provider = 'typetalk';

    done(null, profile);
  });
};

// Expose constructor.
module.exports = Strategy;
