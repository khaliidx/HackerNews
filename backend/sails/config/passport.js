var passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});




passport.use(new FacebookStrategy({
    clientID: "484628121877759",
    clientSecret: "327f71356cb49a72867c1f884e9a61ce",
    callbackURL: "http://localhost:1337/facebook/callback",
    enableProof: false,
    profileFields:['id','displayName','email']
  }, function (accessToken, refreshToken, profile, done) {

    process.nextTick(function(){
            /* save if new */
            User.findOne({'facebookId': profile.id}, function(err, u) {
                
                if (err) { return next(err); }
                // if user is new
                if(!u) {

                    var data = {
                      facebookId : profile.id,
                      username : profile.displayName,
                    };
                    if(!profile.emails) data.email = "NOT VERIFIED";        
                    else data.email = profile.emails[0].value;

                    User.create(data, function(err, user) {
                      if(err) return done(err);
                      return done(err, user);
                    });
                //else login normally
                } else {
                    done(null, u);
                }
            });

        });
        

  }
));