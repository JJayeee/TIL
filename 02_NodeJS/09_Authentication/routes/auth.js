// import {httpOnly} from "express-session";

const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const { password, email, nick } = req.body;
  try {
    // const exUser_username = await User.findOne({ where: { username }});
    // if (exUser_username) {
    //   // req.flash('joinError', '이미 가입 된 아이디 입니다.');
    //   return res.status(400).send('이미 가입 된 아이디 입니다.');
    //

    const exUser_email = await User.findOne({ where: { email } });
    if (exUser_email) {
      // req.flash('joinError', '이미 가입 된 이메일 입니다.');
      return res.status(400).send('이미 가입 된 이메일 입니다.');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      password: hash,
      email,
      nick,
    });

    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({
      username: user.email,
    }, process.env.JWT_SECRET, {
      expiresIn: '7d',
      issuer: 'JAY'
    });


    return res.status(200).json({
      user: {
        id: user.id,
        username: user.email,
      },
      token,
      message: '테스트 성공'
    });

  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', {session: false}, (authError, user, info) => {
    // console.log(authError);
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // req.flash('loginError', info.message);
      return res.redirect('/');
    }
    return req.login(user, {session: false}, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      const token = jwt.sign({
        username: user.email,
      }, process.env.JWT_SECRET, {
        expiresIn: '7d',
        issuer: 'JAY'
      });

      return res.status(200).cookie('jwt', token).json({
        user: {
          id: user.id,
          username: user.email,
        },
        token,
        message: '로그인 성공'
      });
    });
  })(req, res, next);
});


router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/',
}), (req, res) => {
  const user = req.user;
  console.log(user);
  console.log(user.accessToken);
  // console.log(user.refreshToken);
  console.log('hererere I am');
  res.status(200).json({
    user: user,
    token: user.accessToken,
    token2: user.refreshToken,
  });
});


module.exports = router;
