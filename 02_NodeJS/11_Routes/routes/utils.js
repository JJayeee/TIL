const jwt = require('jsonwebtoken');

exports.isLoggedIn = (req, res, next) => {
  if (req.signedCookies['haveCookie']) {
    next();
  } else {
    res.status(403).send({
      message: '로그인 해주세요.'
    });
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.signedCookies['haveCookie']) {
    next();
  } else {
    res.status(403).send({
      message: '로그인 에러'
    });
  }
};

exports.signJWT = (user) => {
  const token = jwt.sign({
    username: user.userName,
    nickname: user.nickName,
  }, process.env.JWT_SECRET, {
    expiresIn: '1d',
    issuer: 'HAVEIT'
  });
  return token
};
