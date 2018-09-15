const c = require('../../constants');
const jwt = require('jsonwebtoken');
const secretKey = c.SECRET_KEY;

module.exports = function checkToken(req,res,next){
  // clear req.body.userId to be safe, only valid if set by this function
  req.body.userId = null;

  var token;
  if(req.headers.authorization){
    token = req.headers.authorization.split(' ')[1];
  }
  if(token){
    jwt.verify(token, secretKey, function(err, decoded){
      if(err){
        res.json({error: 'token not valid'})
      }else{
        req.body.userId = decoded.id;
        next()
      }
    })
  }else{
    res.json({error: 'must be signed in'})
  }
}
