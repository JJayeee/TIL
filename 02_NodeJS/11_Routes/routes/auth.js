const controller = require('../controllers/auth');
const { isNotLoggedIn } = require('./utils');

module.exports = (router) => {
  router.route('/signup')
    .post(isNotLoggedIn, controller.signup);

  router.route('/login')
    .post(isNotLoggedIn, controller.login);

  router.route('/logout')
    .get(controller.logout);

  return router;
};