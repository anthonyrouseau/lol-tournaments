const express = require('express');
const router = express.Router();
const User = require('../../mongoose/schemas/user');
const bcrypt = require('bcrypt');
const c = require('../../constants');
const jwt = require('jsonwebtoken');


router.post('/', (req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  if(username && password){
    User.findOne({username: username})
    .then(user => {
      if(user){
        bcrypt.compare(password, user.passwordHash)
        .then(same => {
          if(same){
            return res.json({
              token: jwt.sign({username: user.username, id: user.id}, c.SECRET_KEY),
              id: user.id,
              username: user.username
            })
          }else{
            res.json({error: 'password does not match'})
          }
        })
        .catch(err => res.json({error: 'error logging in'}))
      }else{
        res.json({error: 'user not found'})
      }
    })
    .catch(err => res.json({error: 'error finding user'}))
  }else{
    res.json({error: 'username and password required'})
  }
});





module.exports = router;
