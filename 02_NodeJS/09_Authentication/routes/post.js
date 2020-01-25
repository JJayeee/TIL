const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();


router.get('/connect', (req, res, next) => {
  try {
    console.log('connected with frontend');
    res.json({
      code: 200,
      name: 'hello there'
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;