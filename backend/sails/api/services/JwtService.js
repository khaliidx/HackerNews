
var jwt = require('jsonwebtoken');  
var jwtSecret = "randomstring";

module.exports = {  
  issue: function (payload) {
    token = jwt.sign(payload, jwtSecret, {expiresIn: 180 * 60})
    return token
  },

  verify: function (token, callback) {
    return jwt.verify(token, jwtSecret, callback);
  }
}