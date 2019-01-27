var chai = require('chai')
  , TypetalkStrategy = require('../lib/strategy');

describe('Strategy', function() {
   
  describe('constructed', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});

    it('should be named typetalk', function() {
      expect(strategy.name).to.equal('typetalk');
    });
  })

  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        var strategy = new TyeptalkStrategy(undefined, function(){});
      }).to.throw(Error);
    });
  })

  describe('authorization request with display parameter', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});

    var url;

    before(function(done) {
      chai.passport.use(strategy)
        .redirect(function(u) {
          url = u;
          done();
        })
        .req(function(req) {
        })
        .authenticate({ authType: 'reauthenticate', authNonce: 'foo123' });
    });

    it('should be redirected', function() {
      expect(url).to.equal('https://typetalk.com/oauth2/authorize?response_type=code&client_id=ABC123')
    });
  });

});