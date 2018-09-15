const express = require('express');
const router = express.Router();
const user = require('./user');
const riot = require('./riot');
const team = require('./team');
const tournament = require('./tournament');
const match = require('./match');
const teamInvite = require('./teamInvite');
const auth = require('./auth');

router.use('/users', user);
router.use('/riot', riot);
router.use('/teams', team);
router.use('/tournaments', tournament);
router.use('/matches', match);
router.use('/teaminvites', teamInvite);
router.use('/auth', auth);

module.exports = router;
