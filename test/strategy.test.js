var chai = require('chai')
  , TypetalkStrategy = require('../lib/strategy');


describe('Strategy', function() {
   
  describe('constructed', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    }, function() {});

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

  describe('authorization request with callbackURL and scope parameters', function() {
    var strategy = new TypetalkStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret',
      callbackURL: "http://localhost:3000/auth/typetalk/callback",
      scope: ['my', 'topic.read']
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
        .authenticate();
    });

    it('should be redirected', function() {
      expect(url).to.equal('https://typetalk.com/oauth2/authorize?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Ftypetalk%2Fcallback&scope=my%20topic.read&client_id=ABC123')
    });
  })

});