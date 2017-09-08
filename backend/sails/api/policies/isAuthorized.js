

module.exports = function isAuthorized (req, res, next) {  
  let token;
  console.log(req.headers+" "+req.headers.authorization);
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    } else {
      return res.json("Format is Authorization: Bearer [token]");
    }
  } else if (req.cookies.token) {
    token = req.cookies.token;
    delete req.cookies.token;
  } else {
    return res.json("No authorization header was found");
  }

  JwtService.verify(token, function(err, decoded){
    if (err) return res.json("Invalid Token!");
    req.token = token;
    User.findOne({id: decoded.id}).then(function(user){
      res.locals.user = user;
      console.log("hello again!");
      next();
    })
  });

}