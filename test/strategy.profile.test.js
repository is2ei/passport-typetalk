var TypetalkStrategy = require('../lib/strategy');


describe('Strategy#userProfile', function() {

  describe('fetched from default endpoint', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      if (url != 'https://typetalk.com/api/v1/profile') { return callback(new Error('incorrect url argument')); }
      if (accessToken != 'token') { return callback(new Error('incorrect token argument')); }

      var body = '{"account":{"id":12345}}';
      callback(null, body, undefined);
    };

    var profile;
    before(function(done) {
      strategy.userProfile('token', function(err, p) {
        if (err) { return done(err); }
        profile = p;
        done();
      });
    });

    it('should parse profile', function() {
      expect(profile.provider).to.equal('typetalk');

      expect(profile.id).to.equal(12345);
    });
  });

  describe('error caused by malformed response', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      var body = 'Hello, world!';
      callback(null, body, undefined);
    };

    var err, profile;
    before(function(done) {
      strategy.userProfile('token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('Failed to parse user profile');
    });
  });

  describe('internal error', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});

    strategy._oauth2.get = function(url, accessToken, callback) {
      return callback(new Error('something went wrong'));
    };

    var err, profile;
    before(function(done) {
      strategy.userProfile('wrong-token', function(e, p) {
        err = e;
        profile = p;
        done();
      });
    });

    it('should error', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.constructor.name).to.equal('InternalOAuthError');
      expect(err.message).to.equal('Failed to fetch user profile');
      expect(err.oauthError).to.be.an.instanceOf(Error);
      expect(err.oauthError.message).to.equal('something went wrong');
    });

    it('should not load profile', function() {
      expect(profile).to.equal(undefined);
    });
  });

});
