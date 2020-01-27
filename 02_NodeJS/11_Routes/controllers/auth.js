const bcrypt = require('bcrypt');
const { signJWT } = require('../routes/utils');
const { User } = require('../models');

module.exports = {
  /**
   * @swagger
   * definitions:
   *  user:
   *   type: object
   *   required:
   *     - userName
   *     - password
   *     - email
   *     - nickName
   *   properties:
   *     id:
   *       type: integer
   *       description: ObjectId
   *     userName:
   *       type: string
   *       description: 아이디
   *     password:
   *       type: string
   *       description: 비밀번호
   *     email:
   *       type: string
   *       description: 이메일 주소
   *     nickName:
   *       type: string
   *       description: 닉네임
   */

  /**
   * @swagger
   *  /auth/signup/:
   *    post:
   *      tags:
   *      - auth
   *      description: 회원가입
   *      produces:
   *      - applicaion/json
   *      - application/xml
   *      parameters:
   *      - name: username
   *        in: formData
   *        type: string
   *      - name: password
   *        in: formData
   *        type: string
   *      - name: email
   *        in: formData
   *        type: string
   *      - name: nickname
   *        in: formData
   *        type: string
   *
   *      responses:
   *       200:
   *        description: 회원가입 결과
   */
  signup: async (req, res, next) => {
    const {username: userName, password, email, nickname: nickName} = req.body;
    // console.log(username);
    try {
      const exUser_name = await User.findOne({where: {userName}});
      if (exUser_name) {
        return res.status(400).json({
          message: '이미 가입 된 아이디 입니다.'
        });
      }

      const exUser_email = await User.findOne({where: {email}});
      if (exUser_email) {
        return res.status(400).json({
          message: '이미 가입 된 이메일 입니다.'
        });
      }

      const hash = await bcrypt.hash(password, 12);
      const user = await User.create({
        userName,
        password: hash,
        email,
        nickName,
      });

      const token = signJWT(user);
      res.cookie('haveCookie', token, {
        // expires: new Date(Date.now() + 40000),
        httpOnly: true,
        signed: true,
      });
      return res.status(200).json({
        user: {
          nickname: user.nickName,
        },
        message: '회원가입 성공'
      });

    } catch (error) {
      console.error(error);
      return next(error);
    }
  },

  /**
   * @swagger
   *  /auth/login/:
   *    post:
   *      tags:
   *      - auth
   *      description: 로그인
   *      produces:
   *      - applicaion/json
   *      - application/xml
   *      parameters:
   *      - name: username
   *        in: formData
   *        type: string
   *      - name: password
   *        in: formData
   *        type: string
   *
   *      responses:
   *       200:
   *        description: 로그인 + 쿠키 자동 저장
   */
  login: async (req, res, next) => {
    const {username: userName, password} = req.body;
    try {
      const exUser = await User.findOne({where: {userName}});
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          const token = signJWT(exUser);
          res.cookie('haveCookie', token, {
            httpOnly: true,
            signed: true,
          });
          return res.status(200).json({
            user: {
              nickname: exUser.nickName,
            },
            message: '로그인 성공'
          });
        } else {
          res.status(400).json({
            message: '비밀번호가 일치하지 않습니다.'
          })
        }
      } else {
        res.status(400).json({
          message: '가입되지 않은 회원입니다.'
        })
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  },

  /**
   * @swagger
   *  /auth/logout/:
   *    get:
   *      tags:
   *      - auth
   *      description: 로그아웃
   *      produces:
   *      - application/xml
   *      parameters:
   *      - name: haveCookie
   *        in: cookie
   *        schema:
   *          type: string
   *      responses:
   *       200:
   *        description: 저장되어있던 쿠키가 삭제 됩니다.
   */
  logout: (req, res) => {
    res.clearCookie('haveCookie');
    return res.status(200).json({
      message: '로그아웃 되었습니다.'
    })
  },
};