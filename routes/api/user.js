const express = require('express');
const router = express.Router();
const User = require('../../mongoose/schemas/user');
const bcrypt = require('bcrypt');
const AuthMiddleware = require('./tokenMiddleware');
const jwt = require('jsonwebtoken');
const c = require('../../constants');


router.get('/search/:value/:offset', (req,res) => {
  var offset = parseInt(req.params.offset);
  var re = new RegExp(req.params.value, 'i');
  User.find({username: {
    $regex: re
  }})
  .sort({username: 1})
  .skip(offset)
  .limit(10)
  .select({username: 1, id: 1})
  .then(users => res.json(users));
});
/*
router.get('/by-id/:userId', (req,res) => {
  User.findById(req.params.userId)
  .then(user => res.json(user))
  .catch(err => res.json({error: 'could not get user'}))
});
*/
/*
router.get('/by-team/:teamId', (req,res) => {
  User.find({teams: {$all: [req.params.teamId]}})
  .then(users => res.json(users))
  .catch(err => res.json({error: 'could not get users'}))
});
*/
/*
router.get('/by-tournament/:tournamentId', (req,res) => {

});
*/

router.post('/', (req,res) => {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var userData = {};
  if (username && password && email){
    userData.username = username;
    userData.email = email;
    bcrypt.hash(password,c.SALT_ROUNDS)
    .then( hashed => {
      userData.passwordHash = hashed;
      var newUser = new User(userData);
      newUser
      .save()
      .then(user => {
        res.json({
          token: jwt.sign({username: user.username, id: user.id}, c.SECRET_KEY),
          id: user.id,
          username: user.username
        })
      })
      .catch(err => {
        if(err.code == 11000){
          res.json({error: 'username taken'})
        }else{
          res.json({error: 'sign up error'})
        }
      });
    });
  }else{
    res.json({error: 'username, password and email required'})
  }
});
/*
router.put('/', AuthMiddleware, (req,res) => {
  //do auth checks first then...
  // change to find user by userId and update
  var oldUsername = req.body.username;
  if(req.body.newUsername){
    req.body.username = req.body.newUsername;
    delete req.body.newUsername;
  }
  if(req.body.password){
    bcrypt.hash(req.body.password,saltRounds)
      .then(
        hashed => {
          req.body.passwordHash = hashed;
          delete req.body.password;
          User.update({username: oldUsername},req.body)
            .then(user => res.json({error: null}))
            .catch(err => {if(err.code == 11000){res.json({error: 'username taken'})}});
        }
      );
  }else{
    User.update({username: oldUsername},req.body)
      .then(user => res.json({error: null}))
      .catch(err => {if(err.code == 11000){res.json({error: 'username taken'})}});
  }
});
*/
module.exports = router;
