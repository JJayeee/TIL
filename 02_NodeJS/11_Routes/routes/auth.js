const express = require('express');
const router = express.Router({mergeParams: true});

const controller = require('../controllers/auth');
const { isNotLoggedIn } = require('./utils');


router.post('/signup', isNotLoggedIn, controller.signup);

router.post('/login', isNotLoggedIn, controller.login);

router.get('/logout', controller.logout);


module.exports = router;